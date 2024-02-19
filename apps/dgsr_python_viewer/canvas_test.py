from tkinter import *
# from PIL import ImageTk,Image

ws = Tk()
ws.title('PythonGuides')
ws.geometry('500x500')

canvas = Canvas(
        ws,
        width = 500,
        height = 500
        )
canvas.pack()
# img = PhotoImage(file='qroma_logo.png')
img = PhotoImage(width=200, height=200)

for x in range(30, 50):
        for y in range(30, 80):
                img.put("#000000", (x, y))

canvas.create_image(
        10,
        10,
        anchor=NW,
        image=img
        )
ws.mainloop()