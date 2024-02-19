// import React from "react";
// import { Stack, TextField } from "@mui/material";
// import { useEffect } from "react";
// import { useState } from "react";
// import { GS_IMAGE_HEIGHT, GS_IMAGE_WIDTH } from "../constants";
// import { ISvgToGrayscaleTemplate } from "./ISvgToGrayscaleTemplate";
// import { renderToString } from "react-dom/server";
// import { ISvgToGrayscaleInputs } from "../SvgTemplateSelector";



// const PrototypeSvg = ({line1}: {line1 : string}) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     version="1.1" 
//     baseProfile="full" 
//     width={GS_IMAGE_WIDTH}
//     height={GS_IMAGE_HEIGHT}
//     >
//     <rect width="100%" height="100%" fill="yellow" />
//     <circle cx="150" cy="100" r="80" fill="blue" />
//     <text x="150" y="125" fontSize="60" textAnchor="middle" fill="black">
//        {line1}
//     </text>
//   </svg>
// );


// const createPrototypeSvgGenerationInputs = (line1: string): ISvgToGrayscaleInputs => {
//   const newSvgText = renderToString(
//     <PrototypeSvg 
//       line1={line1}
//       />);
  
//   const svgImageLabel = line1;

//   return {
//     newSvgText,
//     svgImageLabel,
//   }
// }
  

// const PrototypeTemplateForm = (
//   // {svgTextUpdateFn}: {svgTextUpdateFn: (svgTextUpdate: string) => void}
//   {svgGenerationInputsUpdateFn}: {svgGenerationInputsUpdateFn: (svgGenerationInputs: ISvgToGrayscaleInputs) => void}
// ) => {

//   const [line1Text, setLine1Text] = useState('pLxINE1');

//   useEffect(() => {
//     svgGenerationInputsUpdateFn(createPrototypeSvgGenerationInputs(line1Text));
//   }, [line1Text]);

//   return (
//     <>
//       <Stack spacing={2}>
//         <TextField
//           // required
//           id="outlined-required"
//           label="Line 1"
//           key="single-line-text-line1-input"
//           // defaultValue="Hello World"
//           value={line1Text}
//           onChange={(e) => {
//             const line1 = e.target.value;
//             setLine1Text(line1);
//             // svgTextUpdateFn(createSingleLineSvgInputText(line1));
//           } } />
//       </Stack>
//     </>
//   );
// }


// export const PrototypeTemplate: ISvgToGrayscaleTemplate = {
//   templateTitle: "Prototype",
//   // defaultTemplateSvgText: createPrototypeSvgInputText("PROTOTYPE"),
//   defaultSvgToGrayscaleInputs: createPrototypeSvgGenerationInputs("PROxxTOTYPE"),

//   formProvider: (svgToGrayscaleUpdateFn: (svgToGrayscaleUpdateFn: ISvgToGrayscaleInputs) => void) => 
//     <PrototypeTemplateForm svgGenerationInputsUpdateFn={svgToGrayscaleUpdateFn} />,
// }
