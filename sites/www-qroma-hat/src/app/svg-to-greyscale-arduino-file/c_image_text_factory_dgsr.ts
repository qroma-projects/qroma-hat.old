import { convert4bitGrayscaleToDgsr, create4bitDgsrAllPixelRunsBytesStr, create4bitDgsrDataStr } from "./Dgsr4bitConverter";
import { GrayscaleConversionOutput } from "./GrayscaleConverter"
import { ISvgTemplateInputs } from "./svgTemplates/ISvgToGrayscaleTemplate";


export const createImageDgsrFileContents = (gsData: GrayscaleConversionOutput, gsBitsPerPixel: number, svgTemplateInputs: ISvgTemplateInputs) => {

  const imageWidth = gsData.imageWidthInPixels
  const imageHeight = gsData.imageHeightInPixels;

  const dgsrData = convert4bitGrayscaleToDgsr({gsData});
  // const dgsrDataStr = create4bitDgsrDataStr(dgsrData);
  const dgsrPixelRunBytesStr = create4bitDgsrAllPixelRunsBytesStr(dgsrData);

  // const dgsrBytesStr = dgsrDataStr;
  const dgsrBytesStr = dgsrPixelRunBytesStr;

  // const imageIndex = `${svgTemplateInputs.imageGroupNameRoot}_${gsData.imageCodeId}`;
  const imageCodeId = gsData.imageLabel.replace(/ /g, '_');
  const imageDataId = `${svgTemplateInputs.imageGroupNameRoot}_${imageCodeId}`;;
  const imageIndex = 'XX';
  // const imageIndex = '01';

  const imageLabelPointerVarName = `thisImageLabel_${imageDataId}`;


  const templateStr: string = `
#include "${svgTemplateInputs.imageTypesFilePath}"

const uint8_t thisDgsrData[
  ${dgsrData.dataAsUint8Array.length}   // ${dgsrData.dataAsUint8Array.length} bytes of DGSR data
] = {
${dgsrBytesStr}
};

const char * ${imageLabelPointerVarName} = "${dgsrData.imageLabel}";

HatDgsrImageDef dgsr_image_${imageIndex}_def = {
  .magic = {'d', 'g', 's', 'r'},
  
  .imageWidth = ${imageWidth},
  .imageHeight = ${imageHeight},
  .gsBitsPerPixel = ${gsBitsPerPixel},

  .dgsrDataByteCount = ${dgsrData.dataAsUint8Array.length},

  .metadata = {
    .imageLabel = ${imageLabelPointerVarName},
  },

  .dgrsData = thisDgsrData,
};
`;

  return templateStr;
}