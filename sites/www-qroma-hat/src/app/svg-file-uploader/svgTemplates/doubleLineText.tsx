import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { ISvgTemplateInputs, ISvgTemplateFormProps, ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
import { GS_IMAGE_HEIGHT, GS_IMAGE_WIDTH } from "../constants";
import { renderToString } from "react-dom/server";
import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";


const DEFAULT_FONT_FAMILY = "arial";
const DEFAULT_FONT_SIZE = 170;


const DoubleLineSvg = ({line1, line2, svgTemplateInputs}: {line1 : string, line2: string, svgTemplateInputs: ISvgTemplateInputs}) => (
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
      y={GS_IMAGE_HEIGHT * (0.33)}
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
      y={GS_IMAGE_HEIGHT * (0.75)}
      fontSize={svgTemplateInputs.fontSize}
      fontFamily={svgTemplateInputs.fontFamily}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="black"
      >
      {line2}
    </text>
  </svg>
);


const createDoubleLineSvgInputText = (line1: string, line2: string, svgTemplateInputs: ISvgTemplateInputs): ISvgToGrayscaleInputs => {
  const newSvgText = renderToString(
    <DoubleLineSvg 
      line1={line1} 
      line2={line2} 
      svgTemplateInputs={svgTemplateInputs}
    />);
  
  const svgImageLabel = line1 + " " + line2;

  return {
    newSvgText,
    svgImageLabel,
  }
}


const DoubleLineTextTemplateForm = (
  props: ISvgTemplateFormProps
) => {
  console.log("IN FORM PROVIDER - 2");

  const [line1Text, setLine1Text] = useState('QROMA');
  const [line2Text, setLine2Text] = useState('HAT');

  // const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
  // const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);


  useEffect(() => {
    // svgGenerationUpdateFn(createDoubleLineSvgInputText(line1Text, line2Text, 
    //   {fontFamily, fontSize}));
    props.svgGenerationInputsUpdateFn(createDoubleLineSvgInputText(line1Text, line2Text, props.templateInputs));
  }, [line1Text, line2Text, props.templateInputs]);

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
      </Stack>
    </>
  )
}



export const DoubleLineTextTemplate: ISvgToGrayscaleTemplate = {
  templateTitle: "Double Line",
  defaultSvgToGrayscaleInputs: (svgTemplateInputs: ISvgTemplateInputs) => createDoubleLineSvgInputText("", "", svgTemplateInputs),
  // defaultSvgToGrayscaleInputs: createDoubleLineSvgInputText("LINE 1.0", "LINE 2.0", {
  //   fontFamily: DEFAULT_FONT_FAMILY,
  //   fontSize: DEFAULT_FONT_SIZE,
  // }),
  // formProvider: (svgGenerationUpdateFn: (svgGenerationUpdateFn: ISvgToGrayscaleInputs) => void) => 
  //   <DoubleLineTextTemplateForm 
  //     svgGenerationUpdateFn={svgGenerationUpdateFn} 
  //     />,
  formProvider: (formProps: ISvgTemplateFormProps) => 
    <DoubleLineTextTemplateForm 
      svgGenerationInputsUpdateFn={formProps.svgGenerationInputsUpdateFn} 
      templateInputs={formProps.templateInputs}
      />,
}
