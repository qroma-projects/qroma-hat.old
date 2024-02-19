import { UInt8 } from "bitwise/types";
import { getHighNibbleForByte, getLowNibbleForByte } from "./bitwise_utils";
import { GrayscaleConversionAlgorithm, _convertByteTo4BitGrayscaleNibble, _convertTo4BitGrayscaleByte_Average } from "./GrayscaleConverter";

const DefaultImageData: ImageData = {
  height: 100,
  width: 100,
  colorSpace: "display-p3",
  data: new Uint8ClampedArray(),
}

const DefaultConversionAlgorithm: GrayscaleConversionAlgorithm = GrayscaleConversionAlgorithm.average;


describe("getHighNibbleForByte", () => {
  it.each([
    [0x01, 0],
    [0x12, 1],
    [0x23, 2],
    [0x34, 3],
    [0x45, 4],
    [0x56, 5],
    [0x67, 6],
    [0x78, 7],
    [0x81, 8],
    [0x92, 9],
    [0xA3, 10],
    [0xB4, 11],
    [0xC5, 12],
    [0xD6, 13],
    [0xE7, 14],
    [0xF8, 15],
  ])("when the input is '%s'", (v, expected) => {
    expect(getHighNibbleForByte(v as UInt8)).toBe(expected);
  });
});


describe("getLowNibbleForByte", () => {
  it.each([
    [0x10, 0],
    [0x21, 1],
    [0x32, 2],
    [0x43, 3],
    [0x54, 4],
    [0x65, 5],
    [0x76, 6],
    [0x87, 7],
    [0x98, 8],
    [0x19, 9],
    [0x2A, 10],
    [0x3B, 11],
    [0x4C, 12],
    [0x5D, 13],
    [0x6E, 14],
    [0x7F, 15],
  ])("when the input is '%s'", (v, expected) => {
    expect(getLowNibbleForByte(v as UInt8)).toBe(expected);
  });
});
