import bitwise from "bitwise";
import { UInt4 } from "bitwise/types";
import { convertNibblesToHexRow, convertToGrayscale, GrayscaleConversionAlgorithm, GrayscaleConverterInputs, _convertByteTo4BitGrayscaleNibble, _convertTo4BitGrayscaleByte_Average } from "./GrayscaleConverter";

const DefaultImageData: ImageData = {
  height: 100,
  width: 100,
  colorSpace: "display-p3",
  data: new Uint8ClampedArray(),
}

const DefaultConversionAlgorithm: GrayscaleConversionAlgorithm = GrayscaleConversionAlgorithm.average;

describe("convertToGrayscale", () => {
  it("should throw an exception when image width is not an even number", () => {
    // arrange
    const inputs: GrayscaleConverterInputs = {
      imageData: {
        ...DefaultImageData,
        width: 5,
      },
      conversionAlgorithm: DefaultConversionAlgorithm,
      imageLabel: "",
    };

    // act
    const act = () => {
      convertToGrayscale(inputs);
    }

    // assert
    expect(act).toThrowError("Image width must be even");
  });

  it("should copy the input image label to the output", () => {
    // arrange
    const inputs: GrayscaleConverterInputs = {
      imageData: {
        ...DefaultImageData,
        width: 6,
      },
      conversionAlgorithm: DefaultConversionAlgorithm,
      imageLabel: "abc-xyz",
    };

    // act
    const actual = convertToGrayscale(inputs);

    // assert
    expect(actual.imageLabel).toEqual("abc-xyz");
  });
});


describe("_convertTo4BitGrayscaleByte_Average", () => {
  it.each([
    // p1r, p1g, p1b, p1a, p2r, p2g, p2b, p2a, expected
    [0, 0, 0, 0, 0, 0, 0x00],
    [255, 255, 255, 0, 0, 0, 0xF0],
    [0, 0, 0, 255, 255, 255, 0x0F],
    [255, 255, 255, 255, 255, 255, 0xFF],
  ])("when the input is '%s, %s, %s, %s, %s, %s'", (p1r, p1g, p1b, p2r, p2g, p2b, expected) => {
    expect(_convertTo4BitGrayscaleByte_Average({
      p1r, p1g, p1b, p2r, p2g, p2b
    })).toBe(expected);
  });
});


describe("_convertByteTo4BitGrayscaleValue", () => {
  it.each([
    [0, 0x00],
    [15, 0x00],
    [16, 0x01],
    [31, 0x01],
    [32, 0x02],
    [47, 0x02],
    [48, 0x03],
    [63, 0x03],
    [64, 0x04],
    [79, 0x04],
    [80, 0x05],
    [95, 0x05],
    [96, 0x06],
    [111, 0x06],
    [112, 0x07],
    [127, 0x07],
    [128, 0x08],
    [143, 0x08],
    [144, 0x09],
    [159, 0x09],
    [160, 0x0A],
    [175, 0x0A],
    [176, 0x0B],
    [191, 0x0B],
    [192, 0x0C],
    [207, 0x0C],
    [208, 0x0D],
    [223, 0x0D],
    [224, 0x0E],
    [239, 0x0E],
    [240, 0x0F],
    [255, 0x0F],
  ])("when the input is '%s'", (b, expected) => {

    const gsNibble = _convertByteTo4BitGrayscaleNibble(b);
    expect(bitwise.nibble.write(gsNibble)).toBe(expected);
  });

  describe("convertNibblesToHexRow", () => {
    it.each([
      [[0, 0] as UInt4[], "0x00",],
      [[0, 1] as UInt4[], "0x01",],
      [[1, 0] as UInt4[], "0x10",],
      [[1, 1] as UInt4[], "0x11",],
      [[0, 15] as UInt4[], "0x0F",],
      [[15, 0] as UInt4[], "0xF0",],
    ])("when the input is '%s'", (nibbles: UInt4[], expected) => {
      const hexRow = convertNibblesToHexRow(nibbles);
      expect(hexRow).toBe(expected);
    });
  })
});