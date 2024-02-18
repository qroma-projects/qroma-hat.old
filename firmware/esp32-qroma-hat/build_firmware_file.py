# based on code and comments found here: https://github.com/platformio/platform-espressif32/issues/1078

Import("env")
import os
import json

APP_BIN = "$BUILD_DIR/${PROGNAME}.bin"
BOARD_CONFIG = env.BoardConfig()
# print(env.Dump())


board_variant = BOARD_CONFIG.get("build.variant")
print("MERGING FIRMWARE FOR BOARD '" + board_variant + "'")

PROJECT_ID = "qroma-hat"
MERGED_BIN_FILENAME = f"{PROJECT_ID}-firmware-{board_variant}.bin"

MERGED_BIN = f"$BUILD_DIR/{MERGED_BIN_FILENAME}"
CHIP_FAMILY = BOARD_CONFIG.get("build.mcu", "esp32")


def get_manifest_chip_family():
    if CHIP_FAMILY == "esp32":
        return "ESP32"
    if CHIP_FAMILY == "esp32c3":
        return "ESP32-C3"

    return f"unrecognized-chip-family ({CHIP_FAMILY})"


def merge_bin(source, target, env):
    # The list contains all extra images (bootloader, partitions, eboot) and
    # the final application binary
    flash_images = env.Flatten(env.get("FLASH_EXTRA_IMAGES", [])) + ["$ESP32_APP_OFFSET", APP_BIN]

    # Run esptool to merge images into a single binary
    env.Execute(
        " ".join(
            [
                "$PYTHONEXE",
                "$OBJCOPY",
                "--chip",
                CHIP_FAMILY,
                "merge_bin",
                # "--fill-flash-size",
                # BOARD_CONFIG.get("upload.flash_size", "4MB"),
                "-o",
                MERGED_BIN,
            ]
            + flash_images
        )
    )


def create_esp_web_tools_manifest(source, target, env):
    print("TARGET")
    firmware_path = target[0].get_abspath()
    firmware_dir = os.path.dirname(firmware_path)
    print(firmware_dir)

    manifest_json_obj = {
        "name": PROJECT_ID,
        "version": "esp32",
        "builds": [
            {
                "chipFamily": get_manifest_chip_family(),
                "parts": [
                    {
                        "path": MERGED_BIN_FILENAME,
                        "offset": 0,
                    }
                ]
            }
        ]
    }
    manifest_json = json.dumps(manifest_json_obj)
    print(manifest_json)

    manifest_filename = f"{firmware_dir}/{PROJECT_ID}-manifest-{board_variant}.json"
    print("WRITING MANIFEST TO " + manifest_filename)
    with open(manifest_filename, "w") as f:
        f.write(manifest_json)


# Add a post action that runs esptoolpy to merge available flash images
env.AddPostAction(APP_BIN , merge_bin)
env.AddPostAction(APP_BIN, create_esp_web_tools_manifest)

print("FLAGS")
print(help(env.Replace))
print(env.get("UPLOADERFLAGS"))
print(env.Flatten(env.get("FLASH_EXTRA_IMAGES")))

# Patch the upload command to flash the merged binary at address 0x0
env.Replace(
    UPLOADERFLAGS=[
            f
            for f in env.get("UPLOADERFLAGS")
            if f not in env.Flatten(env.get("FLASH_EXTRA_IMAGES"))
        ]
        + ["0x0", MERGED_BIN],
    UPLOADCMD='"$PYTHONEXE" "$UPLOADER" $UPLOADERFLAGS',
)