import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { ISvgTemplateFormProps, ISvgTemplateInputs, ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
import { GS_IMAGE_HEIGHT, GS_IMAGE_WIDTH } from "../constants";
import { renderToString } from "react-dom/server";
import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";


const DEFAULT_FONT_FAMILY = "arial";
const DEFAULT_FONT_SIZE = 140;


const TripleLineSvg = (
  {line1, line2, line3, svgTemplateInputs}: {line1 : string, line2: string, line3: string, svgTemplateInputs: ISvgTemplateInputs}
) => (
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
      y={GS_IMAGE_HEIGHT * (0.2)}
      fontSize={svgTemplateInputs.fontSize}
      fontFamily={svgTemplateInputs.fontFamily}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="black"
      >
      {line1}
    </text>
    <text 
      x={GS_IMAGE_WIDTH/2} 
      y={GS_IMAGE_HEIGHT * (0.5)}
      fontSize={svgTemplateInputs.fontSize}
      fontFamily={svgTemplateInputs.fontFamily}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="black"
      >
      {line2}
    </text>
    <text 
      x={GS_IMAGE_WIDTH/2} 
      y={GS_IMAGE_HEIGHT * (0.8)}
      fontSize={svgTemplateInputs.fontSize}
      fontFamily={svgTemplateInputs.fontFamily}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="black"
      >
      {line3}
    </text>
  </svg>
);


const createTripleLineSvgInputText = (
  line1: string, 
  line2: string, 
  line3: string, 
  svgTemplateInputs: ISvgTemplateInputs
): ISvgToGrayscaleInputs => {
  const newSvgText = renderToString(
    <TripleLineSvg 
      line1={line1} 
      line2={line2} 
      line3={line3} 
      svgTemplateInputs={svgTemplateInputs}
    />);
  
  const svgImageLabel = line1 + " " + line2 + " " + line3;

  return {
    newSvgText,
    svgImageLabel,
  }
}


const TripleLineTextTemplateForm = (
  // {svgGenerationUpdateFn}: {svgGenerationUpdateFn: (svgGenerationUpdateFn: ISvgToGrayscaleInputs) => void}
  props: ISvgTemplateFormProps
) => {
  console.log("IN FORM PROVIDER - 2");

  const [line1Text, setLine1Text] = useState('FIRST');
  const [line2Text, setLine2Text] = useState('GENERATION');
  const [line3Text, setLine3Text] = useState('PERFECT');

  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);


  useEffect(() => {
    // svgGenerationUpdateFn(createTripleLineSvgInputText(line1Text, line2Text, line3Text,
    //   {fontFamily, fontSize}));
    props.svgGenerationInputsUpdateFn(createTripleLineSvgInputText(line1Text, line2Text, line3Text, {...props.templateInputs, fontSize}));
  }, [line1Text, line2Text, line3Text, props.templateInputs]);

  return (
    <>
      <Stack spacing={2}>
        <TextField
          // required
          id="outlined-required"
          label="Line 1"
          value={line1Text}
          // defaultValue="Hello World"
          onChange={(e) => {
            const line1 = e.target.value;
            setLine1Text(line1);
            // svgTextUpdateFn(createDoubleLineSvgInputText(line1, line2Text));
          } } />
        <TextField
          // required
          id="outlined-required"
          label="Line 2"
          // defaultValue="Hello World"
          value={line2Text}
          onChange={(e) => {
            const line2 = e.target.value;
            setLine2Text(line2);
            // svgTextUpdateFn(createDoubleLineSvgInputText(line1Text, line2));
          }} />
        <TextField
          // required
          id="outlined-required"
          label="Line 3"
          // defaultValue="Hello World"
          value={line3Text}
          onChange={(e) => {
            const line3 = e.target.value;
            setLine3Text(line3);
            // svgTextUpdateFn(createDoubleLineSvgInputText(line1Text, line2));
          }} />
      </Stack>
    </>
  )
}



export const TripleLineTextTemplate: ISvgToGrayscaleTemplate = {
  templateTitle: "Triple Line",
  defaultSvgToGrayscaleInputs: (svgTemplateInputs: ISvgTemplateInputs) => createTripleLineSvgInputText("", "", "", svgTemplateInputs),
  
  formProvider: (formProps: ISvgTemplateFormProps) => 
    <TripleLineTextTemplateForm 
      svgGenerationInputsUpdateFn={formProps.svgGenerationInputsUpdateFn} 
      templateInputs={formProps.templateInputs}
      />,
}
