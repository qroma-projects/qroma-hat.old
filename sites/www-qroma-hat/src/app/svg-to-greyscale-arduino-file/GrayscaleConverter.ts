

// Algorithms to convert color to grayscale

import bitwise from "bitwise";
import { Byte, Nibble, UInt4, UInt8 } from "bitwise/types";

// http://www.johndcook.com/blog/2009/08/24/algorithms-convert-color-grayscale/
export enum GrayscaleConversionAlgorithm {
  lightness = 'lightness',
  average = 'average',
  luminosity = 'luminosity',
}

export interface GrayscaleConverterInputs {
  imageLabel: string
  imageData: ImageData
  conversionAlgorithm: GrayscaleConversionAlgorithm
}

export interface GrayscaleConversionOutput {
  
  readonly dataAsUint8Array: Uint8ClampedArray
  readonly dataAsNibbles: UInt4[]

  /** Returns the actual dimensions of the image in pixels. */
  readonly imageHeightInPixels: number
  readonly imageWidthInPixels: number

  readonly imageLabel: string
  // readonly imageCodeId: string
}

export interface GsDoubleWidePixelInputs {
  p1r: number
  p1g: number
  p1b: number
  // p1a: number
  p2r: number
  p2g: number
  p2b: number
  // p2a: number
}


// export const _convertByteTo4BitGrayscaleValue = (numValue: number): Nibble => {
//   const numValueUint8 = numValue as UInt8;
//   const x = numValueUint8 / 255;
//   const b = bitwise.byte.read(numValueUint8);
//   const x = [0, 0, 0, 0] as UInt4;

//   // const retNibble = bitwise.nibble(

//   // );
//   // const gsBits = bitwise.bits.circularShiftLeft(b, 4);
//   // const sliced = gsBits.slice(0, 4);
//   // return sliced;
// }


export const _convertByteTo4BitGrayscaleNibble = (numValue: number): Nibble => {
  if (numValue < 16) {
    return [0, 0, 0, 0];
  }
  if (numValue < 32) {
    return [0, 0, 0, 1];
  }
  if (numValue < 48) {
    return [0, 0, 1, 0];
  }
  if (numValue < 64) {
    return [0, 0, 1, 1];
  }
  if (numValue < 80) {
    return [0, 1, 0, 0];
  }
  if (numValue < 96) {
    return [0, 1, 0, 1];
  }
  if (numValue < 112) {
    return [0, 1, 1, 0];
  }
  if (numValue < 128) {
    return [0, 1, 1, 1];
  }
  if (numValue < 144) {
    return [1, 0, 0, 0];
  }
  if (numValue < 160) {
    return [1, 0, 0, 1];
  }
  if (numValue < 176) {
    return [1, 0, 1, 0];
  }
  if (numValue < 192) {
    return [1, 0, 1, 1];
  }
  if (numValue < 208) {
    return [1, 1, 0, 0];
  }
  if (numValue < 224) {
    return [1, 1, 0, 1];
  }
  if (numValue < 240) {
    return [1, 1, 1, 0];
  }

  return [1, 1, 1, 1];
}


export const _convertTo4BitGrayscaleByte_Average = (
  gsdwPixelInputs: GsDoubleWidePixelInputs
): number => {
  const {p1r, p1g, p1b, p2r, p2g, p2b } = gsdwPixelInputs;
  // console.log(gsdwPixelInputs);

  const p1Average = ((p1r + p1g + p1b) / 3);
  const p2Average = ((p2r + p2g + p2b) / 3);

  // console.log("P1AVG: " + p1Average);
  // console.log("P2AVG: " + p2Average);

  const p1gsNibble = _convertByteTo4BitGrayscaleNibble(p1Average);
  const p2gsNibble = _convertByteTo4BitGrayscaleNibble(p2Average);

  const p1gs = bitwise.nibble.write(p1gsNibble);
  const p2gs = bitwise.nibble.write(p2gsNibble);

  return (p1gs * 16) + p2gs;
}


export const _convertPixelToTwo4BitGrayscaleNibbles_Average = (
  gsdwPixelInputs: GsDoubleWidePixelInputs
): [UInt4, UInt4] => {
  const {p1r, p1g, p1b, p2r, p2g, p2b } = gsdwPixelInputs;

  const p1Average = ((p1r + p1g + p1b) / 3);
  const p2Average = ((p2r + p2g + p2b) / 3);

  const p1gsNibble = _convertByteTo4BitGrayscaleNibble(p1Average);
  const p2gsNibble = _convertByteTo4BitGrayscaleNibble(p2Average);

  const p1gsUInt4 = bitwise.nibble.write(p1gsNibble);
  const p2gsUInt4 = bitwise.nibble.write(p2gsNibble);

  return [p1gsUInt4, p2gsUInt4];
}


export const convertToGrayscale = (inputs: GrayscaleConverterInputs): GrayscaleConversionOutput => {
  const imageWidth = inputs.imageData.width;
  if (imageWidth % 2 !== 0) {
    throw new Error("Image width must be even");
  }

  // console.log("RUNNING convertToGrayscale");

  if (inputs.conversionAlgorithm !== GrayscaleConversionAlgorithm.average) {
    throw new Error("Unsupported GS conversion algorithm: " + inputs.conversionAlgorithm);
  }

  const imageHeight = inputs.imageData.height;
  const gsBytes = [] as number[];
  const gsNibbles = [] as UInt4[];

  for (let i=0; i < imageHeight; i++) {
    for (let j=0; j < imageWidth; j+=2) {
      const startIndex = ((i * imageWidth) + j) * 4 // 4 bytes per pixel - RGBA;
      // console.log("START INDEX: " + startIndex);
      const imageData = inputs.imageData.data;
      const gsByte = _convertTo4BitGrayscaleByte_Average({
        p1r: imageData[startIndex],
        p1g: imageData[startIndex + 1],
        p1b: imageData[startIndex + 2],
        // p1a: imageData[startIndex + 3],
        p2r: imageData[startIndex + 4],
        p2g: imageData[startIndex + 5],
        p2b: imageData[startIndex + 6],
        // p2a: imageData[startIndex + 7]  
      });
      gsBytes.push(gsByte);
    }
  }

  for (let i=0; i < imageHeight; i++) {
    for (let j=0; j < imageWidth; j+=2) {
      const startIndex = ((i * imageWidth) + j) * 4 // 4 bytes per pixel - RGBA;
      // console.log("START INDEX: " + startIndex);
      const imageData = inputs.imageData.data;
      const [p1gsUInt4, p2gsUInt4] = _convertPixelToTwo4BitGrayscaleNibbles_Average({
        p1r: imageData[startIndex],
        p1g: imageData[startIndex + 1],
        p1b: imageData[startIndex + 2],
        // p1a: imageData[startIndex + 3],
        p2r: imageData[startIndex + 4],
        p2g: imageData[startIndex + 5],
        p2b: imageData[startIndex + 6],
        // p2a: imageData[startIndex + 7]  
      });
      
      gsNibbles.push(p1gsUInt4);
      gsNibbles.push(p2gsUInt4);
    }
  }

  // const imageCodeId = inputs.imageLabel.replace(' ', '_');

  return {
    dataAsUint8Array: new Uint8ClampedArray(gsBytes),
    dataAsNibbles: gsNibbles,
    imageHeightInPixels: imageHeight,
    imageWidthInPixels: imageWidth,
    imageLabel: inputs.imageLabel,
  };
}



export const convertHighAndLowNibblesToHexStr = (highNibble: UInt4, lowNibble: UInt4): string => {
  const highNibbleStr = highNibble.toString(16).toUpperCase();
  const lowNibbleStr = lowNibble.toString(16).toUpperCase();

  return `0x${highNibbleStr}${lowNibbleStr}`;
}


export const convertNibblesToHexRow = (nibbles: UInt4[]): string => {
  const bytesLength = nibbles.length / 2;
  
  const allNibblesAsByteStrs = [];
  for (let i=0; i < bytesLength; i++) {
    const byteIndex = i * 2;
    const nibblesAsHexStr = convertHighAndLowNibblesToHexStr(
      nibbles[byteIndex], nibbles[byteIndex + 1]);
    allNibblesAsByteStrs.push(nibblesAsHexStr);
  }

  return allNibblesAsByteStrs
           .join(',');
}
