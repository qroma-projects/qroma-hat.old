import { createActionCreators, createReducerFunction, ImmerReducer } from "immer-reducer";
import { GrayscaleConversionOutput } from "./GrayscaleConverter";
import { ISvgTemplateInputs, ISvgToGrayscaleTemplate } from "./svgTemplates/ISvgToGrayscaleTemplate";
import { svgToDataURI } from "./svgToDataUri";


export interface IComponentState {
  svgImageText: string
  svgImageAsDataUrl: string
  grayscaleData: GrayscaleConversionOutput
  gsImageLabel: string
  svgToGrayscaleTemplate: ISvgToGrayscaleTemplate
  svgTemplateInputs: ISvgTemplateInputs
}


export const createInitialComponentState = (
  svgToGrayscaleTemplate: ISvgToGrayscaleTemplate,
): IComponentState => {

  const svgTemplateInputs = {
    fontFamily: "arial",
    fontSize: 170,
    borderWidth: 20, 

    imageTypesFilePath: "../../images/image_types.h",
    imageGroupNameRoot: "frank_hats_season2",
    // imageGroupNameRoot: "ajb",
  } as ISvgTemplateInputs;

  const svgImageText = svgToGrayscaleTemplate.defaultSvgToGrayscaleInputs(svgTemplateInputs).newSvgText;

  return {
    svgImageText,
    svgImageAsDataUrl: "",
    grayscaleData: {
      dataAsUint8Array: new Uint8ClampedArray(),
      dataAsNibbles: [],
      imageHeightInPixels: 0,
      imageWidthInPixels: 0,
      imageLabel: "UNLABELED IMAGE",
    },
    gsImageLabel: 'NO LABEL SET YET',
    svgToGrayscaleTemplate,
    svgTemplateInputs,
  }
}


export class UpdateComponentStateFunctions extends ImmerReducer<IComponentState> {
  setSvgText(svgText: string) {
    if (this.draftState.svgImageText !== svgText) {
      this.draftState.svgImageText = svgText;
      const newDataUri = svgToDataURI(svgText);
      this.draftState.svgImageAsDataUrl = newDataUri;
    }
  }

  setGsImageLabel(gsImageLabel: string) {
    if (this.draftState.gsImageLabel !== gsImageLabel) {
      this.draftState.gsImageLabel = gsImageLabel;
    }
  }


  setImageGrayscaleData(gsData: GrayscaleConversionOutput) {
    // console.log("DATA CHANGE: setImageGrayscaleData")
    // if (gsData.imageHeightInPixels !== this.draftState.grayscaleData.imageHeightInPixels) {
      this.draftState.grayscaleData = gsData;
    // }
  }

  setSvgToGrayscaleTemplate(gsTemplate: ISvgToGrayscaleTemplate) {
    if (this.draftState.svgToGrayscaleTemplate !== gsTemplate) {
      this.draftState.svgToGrayscaleTemplate = gsTemplate;
    }
  }

  setSvgImageAsDataUrl(dataUrl: string) {
    // console.log("UPDATE svgImageAsDataUrl");
    // console.log(this.draftState.svgImageAsDataUrl);
    // console.log(dataUrl);
    
    if (this.draftState.svgImageAsDataUrl !== dataUrl) {
      this.draftState.svgImageAsDataUrl = dataUrl;
    }
  }

  setSvgTemplateInputs(svgTemplateInputs: ISvgTemplateInputs) {
    console.log(svgTemplateInputs);
    if (this.draftState.svgTemplateInputs !== svgTemplateInputs) {
      this.draftState.svgTemplateInputs = svgTemplateInputs;
    }
  }
}


export const ActionCreators = createActionCreators(UpdateComponentStateFunctions);
export const componentStateReducerFunction = createReducerFunction(UpdateComponentStateFunctions);
