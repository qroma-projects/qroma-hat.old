import { UInt4 } from "bitwise/types";
import { convertNibblesToHexRow, GrayscaleConversionOutput } from "./GrayscaleConverter"
import { ISvgTemplateInputs } from "./svgTemplates/ISvgToGrayscaleTemplate";


const convertNibblesTo2D = (nibbles: UInt4[], width: number): UInt4[][] => {
  const nibbles2D: UInt4[][] = [];
  for (let i = 0; i < nibbles.length; i += width) {
    nibbles2D.push(nibbles.slice(i, i + width));
  }
  return nibbles2D;
}


// const convertHighAndLowNibblesToHexStr = (highNibble: UInt4, lowNibble: UInt4): string => {
//   const highNibbleStr = highNibble.toString(16);
//   const lowNibbleStr = lowNibble.toString(16);

//   return `0x${highNibbleStr}${lowNibbleStr}`;
// }


// const convertNibblesToHexRow = (nibbles: UInt4[]): string => {
//   const bytesLength = nibbles.length / 2;
  
//   const allNibblesAsByteStrs = [];
//   for (let i=0; i < bytesLength; i++) {
//     const byteIndex = i * 2;
//     const nibblesAsHexStr = convertHighAndLowNibblesToHexStr(
//       nibbles[byteIndex], nibbles[byteIndex + 1]);
//     allNibblesAsByteStrs.push(nibblesAsHexStr);
//   }

//   return allNibblesAsByteStrs
//            .join(',');
// }


const createPixelRowsStr = (gsData: GrayscaleConversionOutput) => {

  const nibbleRows = convertNibblesTo2D(gsData.dataAsNibbles, gsData.imageWidthInPixels);
  const nibbleRowStrs = nibbleRows.map(convertNibblesToHexRow);
  const allNibbleRowStrs = nibbleRowStrs.join(',\n');

  return allNibbleRowStrs;
}

export const createImageTextFileContents = (gsData: GrayscaleConversionOutput, svgTemplateInputs: ISvgTemplateInputs) => {

  const imageWidth = gsData.imageWidthInPixels;
  const imageHeight = gsData.imageHeightInPixels;
  const imageArea = gsData.imageWidthInPixels * gsData.imageHeightInPixels;

  const pixelRowsStr = createPixelRowsStr(gsData);

  const templateStr: string = `

#include "${svgTemplateInputs.imageTypesFilePath}"

const uint32_t thisImageWidth = ${imageWidth};
const uint32_t thisImageHeight = ${imageHeight};
const uint32_t thisImageArea = ${imageArea};
const uint8_t thisImageData[thisImageArea / 2] = {
${pixelRowsStr}
};


HatGsBmpImageDef image_XX_def = {
  .imageWidth = thisImageWidth,
  .imageHeight = thisImageHeight,
  .imageData = thisImageData,
  .imageLabel = "${gsData.imageLabel}",
};
`;

  return templateStr;
}