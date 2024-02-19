import React from "react";
import { Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { GS_IMAGE_HEIGHT, GS_IMAGE_WIDTH } from "../constants";
import { ISvgTemplateFormProps, ISvgTemplateInputs, ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
import { renderToString } from "react-dom/server";
import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";
import ImageUploader from "../ImageUploader";



// const fontFamily = 'Arial, Helvetica, sans-serif';

// const DEFAULT_FONT_FAMILY = "Monospace";
const DEFAULT_FONT_FAMILY = "Arial, Helvetica, sans-serif";
const DEFAULT_FONT_SIZE = 160;


const EMBEDDED_IMAGE_URL = "";
const DEFAULT_IMAGE_LABEL = "Put Image Name Here";


export const EmbeddedImageSvg = ({embeddedImageUrl}: {embeddedImageUrl: string}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1" 
    // baseProfile="full" 
    width={GS_IMAGE_WIDTH}
    height={GS_IMAGE_HEIGHT}
    >
    <rect 
      width="100%" 
      height="100%" 
      fill="white"
      stroke="black"
      strokeWidth="20"
      strokeOpacity="1.0"
      >
    </rect>
    <image
      x="190"
      y="65"
      xlinkHref={embeddedImageUrl}
      />
  </svg>
);

const createEmbeddedImageSvgGenerationInputs = (embeddedImageUrl: string, svgImageLabel: string): ISvgToGrayscaleInputs => {
  const newSvgText = renderToString(
    <EmbeddedImageSvg 
      embeddedImageUrl={embeddedImageUrl}
      />);
  
  return {
    newSvgText,
    svgImageLabel,
  }
}
  


const EmbeddedImageTemplateForm = (
  {svgGenerationInputsUpdateFn}: {svgGenerationInputsUpdateFn: (svgGenerationInputs: ISvgToGrayscaleInputs) => void}
) => {

  const [imageLabel, setImageLabel] = useState(DEFAULT_IMAGE_LABEL);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const onNewImageDataUrl = (imageDataUrl: string) => {
    setImageDataUrl(imageDataUrl);
  }
  
  useEffect(() => {
    svgGenerationInputsUpdateFn(createEmbeddedImageSvgGenerationInputs(imageDataUrl, imageLabel));
  }, [imageDataUrl, imageLabel]);


  return (
    <>
      <Stack spacing={2}>
        <ImageUploader
          onNewImageDataUrl={onNewImageDataUrl}
          />
        <TextField
          // required
          id="outlined-required"
          label="Image Name"
          key="single-line-text-line1-input"
          value={imageLabel}
          onChange={(e) => {
            const value = e.target.value;
            setImageLabel(value);
            svgGenerationInputsUpdateFn(createEmbeddedImageSvgGenerationInputs(imageDataUrl, imageLabel));
          } } />
      </Stack>
    </>
  );
}


export const EmbeddedImageTemplate: ISvgToGrayscaleTemplate = {
  templateTitle: "Embedded Image",
  defaultSvgToGrayscaleInputs: () => createEmbeddedImageSvgGenerationInputs(EMBEDDED_IMAGE_URL, DEFAULT_IMAGE_LABEL),

  formProvider: (formProps: ISvgTemplateFormProps) => 
    <EmbeddedImageTemplateForm 
      svgGenerationInputsUpdateFn={formProps.svgGenerationInputsUpdateFn} 
      />,
}
