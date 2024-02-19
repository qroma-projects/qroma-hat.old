import { convert4bitGrayscaleToDgsr } from "./Dgsr4bitConverter";
import { GrayscaleConversionOutput } from "./GrayscaleConverter"
import { ISvgTemplateInputs } from "./svgTemplates/ISvgToGrayscaleTemplate";


export const createDgsrImageFileBytes = (gsData: GrayscaleConversionOutput): Uint8Array => {

  const imageWidth = gsData.imageWidthInPixels
  const imageHeight = gsData.imageHeightInPixels;

  const dgsrData = convert4bitGrayscaleToDgsr({gsData});
  const imageBytes = dgsrData.dataAsUint8Array;

  const headerBytesCount = 12;
  const bodyBytesCount = dgsrData.dataAsUint8Array.length;
  const endBytesCount = 8;

  const fileBytesCount = headerBytesCount + bodyBytesCount + endBytesCount;
  const dgsrFileBytes = new Uint8Array(fileBytesCount);

  dgsrFileBytes[0] = 'd'.charCodeAt(0);
  dgsrFileBytes[1] = 'g'.charCodeAt(0);
  dgsrFileBytes[2] = 's'.charCodeAt(0);
  dgsrFileBytes[3] = 'r'.charCodeAt(0);

  dgsrFileBytes[4] = (imageWidth >> 24) & 0xFF;
  dgsrFileBytes[5] = (imageWidth >> 16) & 0xFF;
  dgsrFileBytes[6] = (imageWidth >> 8) & 0xFF;
  dgsrFileBytes[7] = (imageWidth >> 0) & 0xFF;

  dgsrFileBytes[8] = (imageHeight >> 24) & 0xFF;
  dgsrFileBytes[9] = (imageHeight >> 16) & 0xFF;
  dgsrFileBytes[10] = (imageHeight >> 8) & 0xFF;
  dgsrFileBytes[11] = (imageHeight >> 0) & 0xFF;

  for (let i = 0; i < bodyBytesCount; i++) {
    dgsrFileBytes[headerBytesCount + i] = imageBytes[i];
  }

  for (let i = 0; i < 7; i++) {
    const endByteIndex = headerBytesCount + bodyBytesCount + i;
    dgsrFileBytes[endByteIndex] = 0x00;
  }

  dgsrFileBytes[headerBytesCount + bodyBytesCount + 7] = 0x01;

  return dgsrFileBytes;




//   // const dgsrDataStr = create4bitDgsrDataStr(dgsrData);
//   const dgsrPixelRunBytesStr = create4bitDgsrAllPixelRunsBytesStr(dgsrData);

//   // const dgsrBytesStr = dgsrDataStr;
//   const dgsrBytesStr = dgsrPixelRunBytesStr;

//   // const imageIndex = `${svgTemplateInputs.imageGroupNameRoot}_${gsData.imageCodeId}`;
//   const imageCodeId = gsData.imageLabel.replace(/ /g, '_');
//   const imageDataId = `${svgTemplateInputs.imageGroupNameRoot}_${imageCodeId}`;;
//   const imageIndex = 'XX';
//   // const imageIndex = '01';

//   const imageLabelPointerVarName = `thisImageLabel_${imageDataId}`;


//   const templateStr: string = `
// #include "${svgTemplateInputs.imageTypesFilePath}"

// const uint8_t thisDgsrData[
//   ${dgsrData.dataAsUint8Array.length}   // ${dgsrData.dataAsUint8Array.length} bytes of DGSR data
// ] = {
// ${dgsrBytesStr}
// };

// const char * ${imageLabelPointerVarName} = "${dgsrData.imageLabel}";

// HatDgsrImageDef dgsr_image_${imageIndex}_def = {
//   .magic = {'d', 'g', 's', 'r'},
  
//   .imageWidth = ${imageWidth},
//   .imageHeight = ${imageHeight},
//   .gsBitsPerPixel = ${gsBitsPerPixel},

//   .dgsrDataByteCount = ${dgsrData.dataAsUint8Array.length},

//   .metadata = {
//     .imageLabel = ${imageLabelPointerVarName},
//   },

//   .dgrsData = thisDgsrData,
// };
// `;

//   return templateStr;
}