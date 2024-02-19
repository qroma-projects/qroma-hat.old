import tkinter as tk

from dgsr_loader import DgsrData, load_dgsr_file

FILE_NAME = "file.bin"

dgsr_data = load_dgsr_file(FILE_NAME)

root = tk.Tk()
root.title(FILE_NAME)


def map_gs_to_canvas_color(gs: int):
    num = gs * 16
    gs_color_hex_str = f'{num:02x}'
    return f"#{gs_color_hex_str}{gs_color_hex_str}{gs_color_hex_str}"


canvas = tk.Canvas(root, width=dgsr_data.image_width, height=dgsr_data.image_height)
canvas.pack()
image = tk.PhotoImage(width=dgsr_data.image_width, height=dgsr_data.image_height)

for index, gs in enumerate(dgsr_data.image_bytes):
    col_index = index % dgsr_data.image_width
    row_index = index // dgsr_data.image_width

    color = map_gs_to_canvas_color(gs)

    image.put(color, (col_index, row_index))

canvas.create_image((0, 0), anchor=tk.NW, image=image)


root.mainloop()
