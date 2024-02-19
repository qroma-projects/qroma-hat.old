
import { UInt4, UInt8 } from "bitwise/types";
import { convert4bitGrayscaleToDgsr, createOpPlacePixelByte, createOpRunBytes, DgsrConverterInputs } from "./Dgsr4bitConverter";



describe("convert4bitGrayscaleToDgsr", () => {
  it("should use a MEDIUM_RUN op code for 150 pixels of the same color", () => {
    // arrange

    const dataAsNibbles = [] as UInt4[];
    for (let i = 0; i < 150; i++) {
      dataAsNibbles.push(7);
    }

    const inputs: DgsrConverterInputs = {
      gsData: {
        imageHeightInPixels: 15,
        imageWidthInPixels: 10,
        imageLabel: "GS IMAGE",
        dataAsNibbles,
        dataAsUint8Array: new Uint8ClampedArray(),
      }
    };

    // act
    const act = convert4bitGrayscaleToDgsr(inputs);

    // assert
    const expectedDgsrBytes = [
      0b00000111,   // DGSR_OP_PLACE_PIXEL for GS value of 7
      0b10000000,   // DGSR_OP_MEDIUM_RUN (1st byte) for 150 pixels
      0b10010110,   // DGSR_OP_MEDIUM_RUN (2nd byte) for 150 pixels
    ];

    expect(act).toEqual({
      imageHeightInPixels: 15,
      imageWidthInPixels: 10,
      imageLabel: "GS IMAGE",
      dataAsUint8Array: new Uint8ClampedArray(expectedDgsrBytes),
      pixelRuns: [{
        gsValue: 7,
        opPlacePixelByte: 7,
        opRunLength: [ 128, 150, ],
        runBytes: new Uint8ClampedArray([ 7, 128, 150, ]),
        runLengthInPixels: 150,
      }]
    });
  });
});


describe("createOpPlacePixelByte", () => {
  it.each([
    [0, 0x00],
    [1, 0x01],
    [8, 0x08],
    [15, 0x0F],
  ])("when the input is '%s, %s'", (gsValue, expected) => {
    
    // act
    const act = createOpPlacePixelByte(gsValue as UInt4);

    // assert
    expect(act).toBe(expected);
  });
});


describe("createOpRunBytes", () => {
  it.each([
    [0,         [0b01000000]],
    [1,         [0b01000001]],
    [8,         [0b01001000]],
    [15,        [0b01001111]],
    [65,        [0b10000000, 0b01000001]],
    [256,       [0b10000001, 0b00000000]],
    [16777216,  [0b11000001, 0b00000000, 0b00000000, 0b00000000]],
    [16842751,  [0b11000001, 0b00000000, 0b11111111, 0b11111111]],
    [151060479, [0b11001001, 0b00000000, 0b11111111, 0b11111111]],
  ])("when the input is '%s, %s'", (pixelCount, expected) => {
    
    // act
    const act = createOpRunBytes(pixelCount);

    // assert
    expect(act).toStrictEqual(expected);
  });
});



// describe("numberToBytes", () => {
//   it.each([
//     [0,      [0x00, 0x00, 0x00, 0x00]],
//     [255,    [0x00, 0x00, 0x00, 0xFF]],
//     [256,    [0x00, 0x00, 0x01, 0xFF]],
//     [65536,  [0x00, 0x01, 0xFF, 0xFF]],
//     // [0,  [0, 0, 0, 0]],
//     // [0,  [0, 0, 0, 0]],
//     // [0,  [0, 0, 0, 0]],
//   ])("when the input is '%s, %s'", (pixelCount, expected) => {
    
//     // act
//     const act = numberToBytes(pixelCount);

//     // assert
//     expect(act).toBe(expected);
//   });
// });
