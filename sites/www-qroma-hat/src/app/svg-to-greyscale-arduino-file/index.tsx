import React, { useReducer, useState } from 'react';
import { ImageOutputView } from './ImageOutputView';
import { ISvgToGrayscaleInputs, SvgTemplateSelector, SvgToGrayscaleTemplates } from './SvgTemplateSelector';
import { ActionCreators, componentStateReducerFunction, createInitialComponentState } from './ComponentState';
import { GrayscaleConversionOutput } from './GrayscaleConverter';
import { ISvgTemplateInputs } from './svgTemplates/ISvgToGrayscaleTemplate';


const SvgToGreyscaleArduinoFileTool = () => {

  const initialComponentState = createInitialComponentState(
    SvgToGrayscaleTemplates[0]
  );

  const [svgTemplateIndex, setSvgTemplateIndex] = useState(0);
  
  const [state, dispatch] = useReducer(componentStateReducerFunction, initialComponentState);

  const onSvgToGsInputsUpdate = (svgToGsInputs: ISvgToGrayscaleInputs) => {
    dispatch(ActionCreators.setSvgText(svgToGsInputs.newSvgText));
    dispatch(ActionCreators.setGsImageLabel(svgToGsInputs.svgImageLabel));
  }

  const onNewGrayscaleData = (gsData: GrayscaleConversionOutput) => {
    dispatch(ActionCreators.setImageGrayscaleData(gsData));
  }

  const onNewSvgImageAsDataUrl = (svgImageAsDataUrl: string) => {
    dispatch(ActionCreators.setSvgImageAsDataUrl(svgImageAsDataUrl));
  }

  const onNewSvgTemplateInputs = (svgTemplateInputs: ISvgTemplateInputs) => {
    dispatch(ActionCreators.setSvgTemplateInputs(svgTemplateInputs));
  }


  return (
    <>
      <SvgTemplateSelector
        svgTemplateIndex={svgTemplateIndex}
        onNewSvgTemplateSelected={(templateIndex, newSvgTemplate) => {
          setSvgTemplateIndex(templateIndex);
          dispatch(ActionCreators.setSvgToGrayscaleTemplate(newSvgTemplate));
        }}
        onGenerateNewSvg={(newSvgToGsInputs) => {
          onSvgToGsInputsUpdate(newSvgToGsInputs);
        }}
        onSvgTemplateFormUpdate={(templateTitle, formValues) => {

        }}
        svgTemplateInputs={state.svgTemplateInputs}
        onNewSvgTemplateInputs={onNewSvgTemplateInputs}
        />

      <div style={{
        // width: UI_IMAGE_WIDTH,
        // height: 800,
        // transformOrigin: "0 0",
        // WebkitTransform: "scale(" + UI_IMAGE_SCALING_FACTOR + ")",
        }}>

        <ImageOutputView 
          componentState={state}
          onNewGrayscaleData={onNewGrayscaleData}
          onNewSvgImageAsDataUrl={onNewSvgImageAsDataUrl}
          />
      </div>

      {
        SvgToGrayscaleTemplates[svgTemplateIndex].formProvider({
          templateInputs: state.svgTemplateInputs,
          svgGenerationInputsUpdateFn: onSvgToGsInputsUpdate
        })
      }
    </>
  )
}

export default SvgToGreyscaleArduinoFileTool;
