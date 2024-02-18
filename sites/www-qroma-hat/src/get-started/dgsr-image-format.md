---
title: Devalbo Grayscale Run Image Format
---

### Overview
* Specification Version 1.0 as of 2023-02-05
* Copyright 2023 - [Devalbo](https://www.devalbo.com)

Inspired by https://qoiformat.org/qoi-specification.pdf

*This format was developed to compress grayscale images for e-ink screens using simple, reasonable implementations in both firmware and Javascript/Typescript implementations for the Qroma Hat project.*

### Details

A Devalbo Grayscale Run (DGSR) image file consists of an N-byte header, followed by any number of
data chunks, and an 8-byte end marker.

```
dgsr_header {
  char magic[4];            // magic bytes "dgsr"
  uint32_t width;           // image width in pixels (BE)
  uint32_t height;          // image height in pixels (BE)
  uint8_t gsBitsPerPixel   // Max number of bits per pixel (1-6, so up to 64 GS values are possible)
};
```

Images are encoded row by row, left to right, top to bottom. The decoder and encoder start with 0 as the previous pixel value. An image is complete when all pixels specified by width * height have been covered. Pixels are encoded as:
* `DGSR_OP_PLACE_PIXEL` - place a single pixel
* `DGSR_OP_SHORT_RUN` - start a short run of the previous pixel (uses 6 bits of op code byte, 0-63 pixels)
* `DGSR_OP_MEDIUM_RUN` - start a medium run of the previous pixel (uses 6 bits of op code byte, plus following 1 byte, treated as two bytes without the top 2 most significant bits)
* `DGSR_OP_LONG_RUN` - start a long run of the previous pixel (uses 6 bits of op code byte, plus following 3 bytes, treated as four bytes without the top 2 most significant bits)

The byte stream's end is marked with 7 0x00 bytes followed by a single 0x01 byte.

The possible bytes are:

```
DGSR_OP_PLACE_PIXEL
DGSR_OP_SHORT_RUN
DGSR_OP_MEDIUM_RUN
DGSR_OP_LONG_RUN

┌─ DGSR_OP_PLACE_PIXEL ──┐
│        Byte[0]         │
│ 7  6  5  4  3  2  1  0 │
│────────────────────────│
│ 0  0 │  GS bits (0-63) │
└────────────────────────┘


┌─ DGSR_OP_SHORT_RUN ────┐
│        Byte[0]         │
│ 7  6  5  4  3  2  1  0 │
│────────────────────────│
│ 0  1 │  Run length     │
└────────────────────────┘

┌─ DGSR_OP_MEDIUM_RUN ───┬─────────┐
│        Byte[0]         │ Byte[1] │
│ 7  6  5  4  3  2  1  0 │ 7 .. 0  │
│────────────────────────┼─────────│
│ 1  0 │  Run length bits (14)     │
└────────────────────────┴─────────┘

┌─ DGSR_OP_LONG_RUN ─────┬─────────┬─────────┬─────────┐
│        Byte[0]         │ Byte[1] │ Byte[2] │ Byte[3] │
│ 7  6  5  4  3  2  1  0 │ 7 .. 0  │ 7 .. 0  │ 7 .. 0  │
│────────────────────────┼─────────┼─────────┼─────────│
│ 1  1 │  Run length bits (30)                         │
└────────────────────────┴─────────┴─────────┴─────────┘
```
