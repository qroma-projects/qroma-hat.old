---
title: Install Firmware
---

# Install Firmware

import { EspWebInstallButton } from '../react-qroma-lib';
import { createManifestPath } from '../qroma-app/firmwareManifest';


Installation of the firmware for qroma-hat is easy to do using a Chrome or Edge desktop
web browser. Use a USB cable to connect your LilyGo-EPD47 board to your PC and click the button to install.

<div title='ESP32 Dev Board'>
  <EspWebInstallButton
    label='Install on LilyGo-EPD47 Board'
    instructionsText="Plug your LilyGo-EPD47 board into your computer's USB port and click the button below to install firmware."
    manifestPath={createManifestPath('qroma/versions/0.1.0/firmware/esp32dev/qroma-hat-manifest-esp32.json')}
    />
</div>

<br/>
<br/>
<br/>
<a href='https://esphome.github.io/esp-web-tools/'>ESP Web Tools</a> is used to install firmware via WebSerial. The installer button uses a <a href={createManifestPath('qroma/versions/0.1.0/firmware/esp32dev/qroma-hat-manifest-esp32.json')} target=''>manifest file </a> to know which files should be installed for its board.