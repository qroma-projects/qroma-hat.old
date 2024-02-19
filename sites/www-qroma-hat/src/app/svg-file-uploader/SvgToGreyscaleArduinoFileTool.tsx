import React, { Dispatch, ReducerAction, SetStateAction, useReducer, useState } from 'react';
import { ImageOutputView } from './ImageOutputView';
import { ISvgToGrayscaleInputs, SvgTemplateSelector, SvgToGrayscaleTemplates } from './SvgTemplateSelector';
import { ActionCreators, IComponentState, UpdateComponentStateFunctions } from './ComponentState';
import { GrayscaleConversionOutput } from './GrayscaleConverter';
import { ISvgTemplateInputs } from './svgTemplates/ISvgToGrayscaleTemplate';



export interface ISvgToGreyscaleArduinoFileToolProps {
  svgTemplateIndex: number
  setSvgTemplateIndex: Dispatch<SetStateAction<number>>
  
  onSvgToGsInputsUpdate: (svgToGsInputs: ISvgToGrayscaleInputs) => void;
  onNewGrayscaleData: (gsData: GrayscaleConversionOutput) => void;
  onNewSvgImageAsDataUrl: (svgImageAsDataUrl: string) => void;
  onNewSvgTemplateInputs: (svgTemplateInputs: ISvgTemplateInputs) => void;

  // dispatch: (value: Dispatch<ReducerAction<ReducerClass>) => void
  // dispatch: (value: ReturnType<typeof ActionCreators<ReducerClass>>) => void
  // dispatch: Dispatch<ReturnType<typeof ActionCreators<UpdateComponentStateFunctions>>> => void

  // dispatch: Dispatch<ReturnType<typeof ActionCreators<UpdateComponentStateFunctions>>>
  state: IComponentState
  dispatch: Dispatch<any>
  // dispatch: Dispatch<SetStateAction<IComponentState>>
}


export const SvgToGreyscaleArduinoFileTool = (props: ISvgToGreyscaleArduinoFileToolProps) => {

  // const initialComponentState = createInitialComponentState(
  //   SvgToGrayscaleTemplates[0]
  // );

  // const [svgTemplateIndex, setSvgTemplateIndex] = useState(0);
  
  // const [state, dispatch] = useReducer(componentStateReducerFunction, initialComponentState);

  // const onSvgToGsInputsUpdate = (svgToGsInputs: ISvgToGrayscaleInputs) => {
  //   dispatch(ActionCreators.setSvgText(svgToGsInputs.newSvgText));
  //   dispatch(ActionCreators.setGsImageLabel(svgToGsInputs.svgImageLabel));
  // }

  // const onNewGrayscaleData = (gsData: GrayscaleConversionOutput) => {
  //   dispatch(ActionCreators.setImageGrayscaleData(gsData));
  // }

  // const onNewSvgImageAsDataUrl = (svgImageAsDataUrl: string) => {
  //   dispatch(ActionCreators.setSvgImageAsDataUrl(svgImageAsDataUrl));
  // }

  // const onNewSvgTemplateInputs = (svgTemplateInputs: ISvgTemplateInputs) => {
  //   dispatch(ActionCreators.setSvgTemplateInputs(svgTemplateInputs));
  // }


  return (
    <>
      <div style={{
        // width: UI_IMAGE_WIDTH,
        // height: 800,
        // transformOrigin: "0 0",
        // WebkitTransform: "scale(" + UI_IMAGE_SCALING_FACTOR + ")",
        }}>

        <ImageOutputView 
          componentState={props.state}
          onNewGrayscaleData={props.onNewGrayscaleData}
          onNewSvgImageAsDataUrl={props.onNewSvgImageAsDataUrl}
          />
      </div>

      <div style={{marginBottom: 20}} />
      <SvgTemplateSelector
        svgTemplateIndex={props.svgTemplateIndex}
        onNewSvgTemplateSelected={(templateIndex, newSvgTemplate) => {
          props.setSvgTemplateIndex(templateIndex);
          props.dispatch(ActionCreators.setSvgToGrayscaleTemplate(newSvgTemplate));
        }}
        onGenerateNewSvg={(newSvgToGsInputs) => {
          props.onSvgToGsInputsUpdate(newSvgToGsInputs);
        }}
        onSvgTemplateFormUpdate={(templateTitle, formValues) => {

        }}
        svgTemplateInputs={props.state.svgTemplateInputs}
        onNewSvgTemplateInputs={props.onNewSvgTemplateInputs}
        />
      <div style={{marginBottom: 20}} />

      {
        SvgToGrayscaleTemplates[props.svgTemplateIndex].formProvider({
          templateInputs: props.state.svgTemplateInputs,
          svgGenerationInputsUpdateFn: props.onSvgToGsInputsUpdate
        })
      }
    </>
  )
}
