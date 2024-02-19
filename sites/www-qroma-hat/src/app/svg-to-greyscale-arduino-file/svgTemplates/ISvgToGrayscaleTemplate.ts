import React from 'react';
import { ISvgToGrayscaleInputs } from '../SvgTemplateSelector';


export interface ISvgToGrayscaleTemplate {
  templateTitle: string
  defaultSvgToGrayscaleInputs: (svgTemplateInputs: ISvgTemplateInputs) => ISvgToGrayscaleInputs
  formProvider: (formProps: ISvgTemplateFormProps) => React.ReactElement
}


export interface ISvgTemplateInputs {
  fontFamily: string
  fontSize: number
  borderWidth: number

  imageTypesFilePath: string
  imageGroupNameRoot: string
}


export interface ISvgTemplateFormProps {
  templateInputs: ISvgTemplateInputs
  svgGenerationInputsUpdateFn: (svgGenerationInputs: ISvgToGrayscaleInputs) => void
}