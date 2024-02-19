import React from "react";
import { renderToString } from 'react-dom/server';
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";


const TestPixelsSvg = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1" 
    baseProfile="full" 
    width="6"
    height="6"
    >
    <rect width="100%" height="100%" fill="black" />
    
    <rect 
      width="3" 
      height="2"
      x="2"
      y="1"
      fill="white"
      dominantBaseline="middle"
      />
  </svg>
);


const createTestPixelsGsInputs = (): ISvgToGrayscaleInputs => {
  const newSvgText = renderToString(
    <TestPixelsSvg 
      />);
  
  const svgImageLabel = "TestPixelsSvg";

  return {
    newSvgText,
    svgImageLabel,
  }
}
  

const TestPixelsTemplateForm = ({svgGenerationInputsUpdateFn}: {svgGenerationInputsUpdateFn: (gsInputsUpdate: ISvgToGrayscaleInputs) => void}) => {

  useEffect(() => {
    svgGenerationInputsUpdateFn(createTestPixelsGsInputs());
  }, []);

  return (
    <>
      <Stack spacing={2}>
      </Stack>
    </>
  );
}


export const TestPixelsTemplate: ISvgToGrayscaleTemplate = {
  templateTitle: "Test Pixels",
  defaultSvgToGrayscaleInputs: createTestPixelsGsInputs(),
  formProvider: (svgTextUpdateFn: (svgTextUpdate: ISvgToGrayscaleInputs) => void) => <TestPixelsTemplateForm svgGenerationInputsUpdateFn={svgTextUpdateFn} />,
}
