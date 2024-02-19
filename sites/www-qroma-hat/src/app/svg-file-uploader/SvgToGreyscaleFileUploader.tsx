import React, { useReducer, useState } from 'react';
import { SvgToGreyscaleArduinoFileTool } from './SvgToGreyscaleArduinoFileTool';
import { ConnectToDevicePanel } from '../ConnectToDevicePanel';
import { IQromaHatApi } from '../api/QromaHatApi';
import { IQromaCommFilesystemApi } from '../../react-qroma-lib/qroma-lib/file-explorer/QromaCommFileSystemApi';
import { ActionCreators, componentStateReducerFunction, createInitialComponentState } from './ComponentState';
import { SvgToGrayscaleTemplates } from './SvgToGrayscaleTemplates';
import { GrayscaleConversionOutput } from './GrayscaleConverter';
import { ISvgToGrayscaleInputs } from './SvgTemplateSelector';
import { ISvgTemplateInputs } from './svgTemplates/ISvgToGrayscaleTemplate';


export interface IConnectToDevicePanelProps {
  qromaHatApi: IQromaHatApi
  qromaCommFilesystemApi: IQromaCommFilesystemApi
}


export const SvgToGreyscaleFileUploader = (props: IConnectToDevicePanelProps) => {

  const initialComponentState = createInitialComponentState(
    SvgToGrayscaleTemplates[0]
  );

  const [svgTemplateIndex, setSvgTemplateIndex] = useState(0);
  
  const [state, dispatch] = useReducer(componentStateReducerFunction, initialComponentState);

  const onNewGrayscaleData = (gsData: GrayscaleConversionOutput) => {
    dispatch(ActionCreators.setImageGrayscaleData(gsData));
  }

  const onNewSvgImageAsDataUrl = (svgImageAsDataUrl: string) => {
    dispatch(ActionCreators.setSvgImageAsDataUrl(svgImageAsDataUrl));
  }

  const onNewSvgTemplateInputs = (svgTemplateInputs: ISvgTemplateInputs) => {
    dispatch(ActionCreators.setSvgTemplateInputs(svgTemplateInputs));
  }

  const onSvgToGsInputsUpdate = (svgToGsInputs: ISvgToGrayscaleInputs) => {
    dispatch(ActionCreators.setSvgText(svgToGsInputs.newSvgText));
    dispatch(ActionCreators.setGsImageLabel(svgToGsInputs.svgImageLabel));
  }

  
  return (
    <>
      <ConnectToDevicePanel
        qromaHatApi={props.qromaHatApi}
        qromaCommFilesystemApi={props.qromaCommFilesystemApi}
        state={state}
        />
      <SvgToGreyscaleArduinoFileTool
        svgTemplateIndex={svgTemplateIndex}
        setSvgTemplateIndex={setSvgTemplateIndex}

        onNewGrayscaleData={onNewGrayscaleData}
        onNewSvgImageAsDataUrl={onNewSvgImageAsDataUrl}
        onNewSvgTemplateInputs={onNewSvgTemplateInputs}
        onSvgToGsInputsUpdate={onSvgToGsInputsUpdate}

        state={state}
        dispatch={dispatch}
        />
    </>
  )

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


  // return (
  //   <>
  //     <div style={{
  //       // width: UI_IMAGE_WIDTH,
  //       // height: 800,
  //       // transformOrigin: "0 0",
  //       // WebkitTransform: "scale(" + UI_IMAGE_SCALING_FACTOR + ")",
  //       }}>

  //       <ImageOutputView 
  //         componentState={state}
  //         onNewGrayscaleData={onNewGrayscaleData}
  //         onNewSvgImageAsDataUrl={onNewSvgImageAsDataUrl}
  //         />
  //     </div>

  //     <div style={{marginBottom: 20}} />
  //     <SvgTemplateSelector
  //       svgTemplateIndex={svgTemplateIndex}
  //       onNewSvgTemplateSelected={(templateIndex, newSvgTemplate) => {
  //         setSvgTemplateIndex(templateIndex);
  //         dispatch(ActionCreators.setSvgToGrayscaleTemplate(newSvgTemplate));
  //       }}
  //       onGenerateNewSvg={(newSvgToGsInputs) => {
  //         onSvgToGsInputsUpdate(newSvgToGsInputs);
  //       }}
  //       onSvgTemplateFormUpdate={(templateTitle, formValues) => {

  //       }}
  //       svgTemplateInputs={state.svgTemplateInputs}
  //       onNewSvgTemplateInputs={onNewSvgTemplateInputs}
  //       />
  //     <div style={{marginBottom: 20}} />

  //     {
  //       SvgToGrayscaleTemplates[svgTemplateIndex].formProvider({
  //         templateInputs: state.svgTemplateInputs,
  //         svgGenerationInputsUpdateFn: onSvgToGsInputsUpdate
  //       })
  //     }
  //   </>
  // )
}
