import os


class DgsrData:
    image_width: int
    image_height: int

    image_bytes: bytearray


def _check_dgsr_start_bytes(dgsr_bytes: bytes):
    assert dgsr_bytes[0] == ord('d')
    assert dgsr_bytes[1] == ord('g')
    assert dgsr_bytes[2] == ord('s')
    assert dgsr_bytes[3] == ord('r')


def _check_dgsr_end_bytes(dgsr_bytes: bytes):
    assert dgsr_bytes[-1] == 0x01
    assert dgsr_bytes[-2] == 0x00
    assert dgsr_bytes[-3] == 0x00
    assert dgsr_bytes[-4] == 0x00
    assert dgsr_bytes[-5] == 0x00
    assert dgsr_bytes[-6] == 0x00
    assert dgsr_bytes[-7] == 0x00
    assert dgsr_bytes[-8] == 0x00


def _get_image_width_and_height(dgsr_bytes: bytes):
    image_width = (dgsr_bytes[4] << 24) | \
                  (dgsr_bytes[5] << 16) | \
                  (dgsr_bytes[6] << 8)  | \
                   dgsr_bytes[7]

    image_height = (dgsr_bytes[8] << 24) | \
                   (dgsr_bytes[9] << 16) | \
                   (dgsr_bytes[10] << 8) | \
                    dgsr_bytes[11]

    return image_width, image_height


def _is_grayscale_pixel(the_byte: int) -> bool:
    first_bit = (the_byte >> 7) & 1
    second_bit = (the_byte >> 6) & 1
    is_byte_pixel = first_bit == 0 and second_bit == 0
    return  is_byte_pixel


def _get_next_pixel_grayscale_value(the_byte: int) -> int:
    assert _is_grayscale_pixel(the_byte)
    return the_byte


def _is_any_op_run_pixel(the_byte: int) -> bool:
    first_bit = (the_byte >> 7) & 1
    second_bit = (the_byte >> 6) & 1
    is_byte_pixel = first_bit == 1 or second_bit == 1
    return is_byte_pixel


def _is_short_op_run_pixel(the_byte: int) -> bool:
    first_bit = (the_byte >> 7) & 1
    second_bit = (the_byte >> 6) & 1
    is_byte_pixel = first_bit == 0 and second_bit == 1
    return is_byte_pixel


def _is_medium_op_run_pixel(the_byte: int) -> bool:
    first_bit = (the_byte >> 7) & 1
    second_bit = (the_byte >> 6) & 1
    is_byte_pixel = first_bit == 1 and second_bit == 0
    return is_byte_pixel


def _is_long_op_run_pixel(the_byte: int) -> bool:
    first_bit = (the_byte >> 7) & 1
    second_bit = (the_byte >> 6) & 1
    is_byte_pixel = first_bit == 1 and second_bit == 1
    return is_byte_pixel


def _get_short_op_run_length(byte_1: int) -> int:
    return byte_1 & 0b00111111


def _get_medium_op_run_length(byte_1: int, byte_2: int) -> int:
    return (byte_1 & 0b00111111) * 256 + byte_2


def _get_long_op_run_length(byte_1: int, byte_2: int, byte_3: int, byte_4: int) -> int:
    return (byte_1 & 0b00111111) * 256 * 256 * 256 + \
           (byte_2 * 256 * 256) + \
           (byte_3 * 256) + \
           byte_4


def _get_run_length_and_num_bytes_consumed(the_bytes: bytes, start_index: int) -> (int, int):
    if _is_short_op_run_pixel(the_bytes[start_index]):
        return _get_short_op_run_length(the_bytes[start_index]), 1

    if _is_medium_op_run_pixel(the_bytes[start_index]):
        return _get_medium_op_run_length(the_bytes[start_index], the_bytes[start_index + 1]), 2

    if _is_long_op_run_pixel(the_bytes[start_index]):
        return _get_long_op_run_length(the_bytes[start_index], the_bytes[start_index + 1],
                                       the_bytes[start_index + 2], the_bytes[start_index + 3]), 4

    print(the_bytes[start_index])
    assert False


def _get_next_grayscale_value_and_run_length_and_num_bytes_consumed(bytes_data: bytes, start_index: int) -> (int, int, int):
    gs_value = _get_next_pixel_grayscale_value(bytes_data[start_index])

    if not _is_any_op_run_pixel(bytes_data[start_index + 1]):
        return gs_value, 0, 1

    run_length, num_bytes_consumed = _get_run_length_and_num_bytes_consumed(bytes_data, start_index + 1)
    return gs_value, run_length, num_bytes_consumed + 1


def load_dgsr_file(filename: os.PathLike) -> DgsrData:
    print(f"LOADING FILE: {filename}")
    
    with open(filename, "rb") as dgsr_file:
        bytes_data = dgsr_file.read()
        print(len(bytes_data))

        _check_dgsr_start_bytes(bytes_data)
        _check_dgsr_end_bytes(bytes_data)

        image_width, image_height = _get_image_width_and_height(bytes_data)

        start_bytes_index = 12
        end_bytes_index = len(bytes_data) - 8

        image_grayscale_values = []

        current_bytes_index = start_bytes_index
        while current_bytes_index < end_bytes_index:
            grayscale, run_length, num_bytes_consumed = _get_next_grayscale_value_and_run_length_and_num_bytes_consumed(bytes_data, current_bytes_index)
            # print(f">> {grayscale} x {run_length}")

            current_bytes_index += num_bytes_consumed

            for i in range(run_length):
                image_grayscale_values.append(grayscale)

        print(f"TOTAL LENGTH: {len(image_grayscale_values)}")
        print(f"IMAGE SIZE: {image_width} x {image_height}")
        print(f"IMAGE AREA: {image_width * image_height}")

        retval = DgsrData()
        retval.image_height = image_height
        retval.image_width = image_width
        retval.image_bytes = image_grayscale_values

        return retval


load_dgsr_file("file.bin")
