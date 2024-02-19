import React from "react";
import { Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { GS_IMAGE_HEIGHT, GS_IMAGE_WIDTH, UI_IMAGE_HEIGHT, UI_IMAGE_WIDTH } from "../constants";
import { ISvgTemplateInputs, ISvgTemplateFormProps, ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
import { renderToString } from "react-dom/server";
import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";



// const fontFamily = 'Arial, Helvetica, sans-serif';

// const DEFAULT_FONT_FAMILY = "Monospace";
const DEFAULT_FONT_FAMILY = "Arial, Helvetica, sans-serif";
const DEFAULT_FONT_SIZE = 160;


const LINE_1_TEXT = "LINE1";
// const LINE_1_TEXT = "";


const SingleLineSvg = ({line1, svgTemplateInputs}: {line1: string, svgTemplateInputs: ISvgTemplateInputs}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1" 
    baseProfile="full" 
    width={GS_IMAGE_WIDTH}
    height={GS_IMAGE_HEIGHT}
    >
    <rect 
      width="100%" 
      height="100%" 
      fill="white"
      stroke="black"
      strokeWidth={svgTemplateInputs.borderWidth}
      strokeOpacity="1.0"
      />
    <text 
      x={GS_IMAGE_WIDTH/2} 
      y={GS_IMAGE_HEIGHT/2}
      fontSize={svgTemplateInputs.fontSize}
      fontFamily={svgTemplateInputs.fontFamily}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="black"
      >
      {line1}
    </text>
  </svg>
);

const createSingleLineSvgGenerationInputs = (line1: string, svgTemplateInputs: ISvgTemplateInputs): ISvgToGrayscaleInputs => {
  const newSvgText = renderToString(
    <SingleLineSvg 
      line1={line1}
      svgTemplateInputs={svgTemplateInputs}
      />);
  
  const svgImageLabel = line1;

  return {
    newSvgText,
    svgImageLabel,
  }
}
  


const SingleLineTextTemplateForm = (
  props: ISvgTemplateFormProps
) => {
  const [line1Text, setLine1Text] = useState(LINE_1_TEXT);
  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const [imgDataUrl, setImgDataUrl] = useState('');

  useEffect(() => {
    props.svgGenerationInputsUpdateFn(createSingleLineSvgGenerationInputs(line1Text, props.templateInputs));
  }, [line1Text, props.templateInputs]);

  return (
    <>
      <Stack spacing={2}>
        <TextField
          // required
          id="outlined-required"
          label="Line 1"
          key="single-line-text-line1-input"
          // defaultValue="Hello World"
          value={line1Text}
          onChange={(e) => {
            const line1 = e.target.value;
            setLine1Text(line1);
            // svgTextUpdateFn(createSingleLineSvgInputText(line1));
          } } />
      </Stack>
    </>
  );
}


export const SingleLineTextTemplate: ISvgToGrayscaleTemplate = {
  templateTitle: "Single Line",
  defaultSvgToGrayscaleInputs: (svgTemplateInputs: ISvgTemplateInputs) => createSingleLineSvgGenerationInputs(LINE_1_TEXT, svgTemplateInputs),

  formProvider: (formProps: ISvgTemplateFormProps) => 
    <SingleLineTextTemplateForm 
      svgGenerationInputsUpdateFn={formProps.svgGenerationInputsUpdateFn} 
      templateInputs={formProps.templateInputs}
      />,
}