import React from 'react';
import { GrayscaleConversionOutput } from './GrayscaleConverter';
import { TextDownload } from './TextDownload';
import { CopyToClipboard } from './CopyToClipboard';
import { TextField } from '@mui/material';
import { createImageDgsrFileContents } from './c_image_text_factory_dgsr';
import { ISvgTemplateInputs } from './svgTemplates/ISvgToGrayscaleTemplate';


const EmptyArduinoDgsrOutputView = () => {
  return (
    <div>Arduino DGSR Output View</div>
  )
}

export const ArduinoDgsrOutputView = ({gsData, svgTemplateInputs} : {gsData? : GrayscaleConversionOutput, svgTemplateInputs: ISvgTemplateInputs}) => {
  if (!gsData) {
    return <EmptyArduinoDgsrOutputView />
  }

  const header = createImageDgsrFileContents(gsData, 4, svgTemplateInputs);

  const imageLabel = gsData.imageLabel.replace(/ /g, '-');
  const fileName = `dgsr_image_XX-${svgTemplateInputs.imageGroupNameRoot}-${imageLabel}.cpp`;

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
          label="DGSR .CPP file Content"
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
