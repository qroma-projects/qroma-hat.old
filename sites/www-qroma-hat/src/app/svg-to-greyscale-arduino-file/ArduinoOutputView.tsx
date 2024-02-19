import React from 'react';
import { GrayscaleConversionOutput } from './GrayscaleConverter';
import { createImageTextFileContents } from './c_image_text_factory_gs_bmp';
import { TextDownload } from './TextDownload';
import { CopyToClipboard } from './CopyToClipboard';
import { TextField } from '@mui/material';
import { ISvgTemplateInputs } from './svgTemplates/ISvgToGrayscaleTemplate';


const EmptyArduinoOutputView = () => {
  return (
    <div>Arduino Output View</div>
  )
}

export const ArduinoOutputView = ({gsData, svgTemplateInputs} : {gsData? : GrayscaleConversionOutput, svgTemplateInputs: ISvgTemplateInputs}) => {
  if (!gsData) {
    return <EmptyArduinoOutputView />
  }

  const header = createImageTextFileContents(gsData, svgTemplateInputs);

  const imageLabel = gsData.imageLabel.replace(/ /g, '-');
  const fileName = `gs_bmp_image_XX-${svgTemplateInputs.imageGroupNameRoot}_${imageLabel}.cpp`;

  return (
    <>
      <TextDownload
        text={header}
        fileName={fileName}
        />
      <CopyToClipboard
        text={header}
        />
      <div>
        <TextField
          id="outlined-multiline-static"
          label=".CPP file Content"
          multiline
          value={header}
          fullWidth={true}
          inputProps={{
            style: {
              fontFamily: 'monospace',
              height: '225px',
              overflow: 'scroll',
            }
          }}
        />
      </div>
    </>
  )
}
