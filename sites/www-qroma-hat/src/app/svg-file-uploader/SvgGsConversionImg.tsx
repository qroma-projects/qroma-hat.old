import React, { useEffect, useRef } from 'react';
import { UI_IMAGE_HEIGHT, UI_IMAGE_WIDTH } from './constants';
import { convertToGrayscale, GrayscaleConversionAlgorithm, GrayscaleConversionOutput } from './GrayscaleConverter';


interface ISvgGsConversionImgProps {
  svgAsDataUrl: string
  gsImageLabel: string
  onGsConvertedData: (gsData: GrayscaleConversionOutput) => void
}

export const SvgGsConversionImg = (props: ISvgGsConversionImgProps) => {

  const imageRef = useRef(null);
  
  const doGrayscaleWork = () => {
    // console.log("DOING GS WORK");

    try {
      if (imageRef === null || imageRef.current === null) return;

      const canvas = document.createElement("canvas");
      canvas.width = imageRef.current.naturalWidth;
      canvas.height = imageRef.current.naturalHeight;

      // console.log(`SVGGSCONV: ${canvas.width} x ${canvas.height}`);

      const context = canvas.getContext("2d")!;
      context.drawImage(imageRef.current, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      // console.log(imageData);

      const gsData = convertToGrayscale({
        imageData: imageData!,
        conversionAlgorithm: GrayscaleConversionAlgorithm.average,
        imageLabel: props.gsImageLabel,
      });

      console.log(gsData);

      props.onGsConvertedData(gsData);



      // const gsRenderCanvas = document.createElement('canvas');

      // console.log("gsRenderCanvas CANVAS: " + gsRenderCanvas);
      // // console.log(theSvgImage);
      // // theSvgCanvas.width = theSvgCanvas.width;
      // // theSvgCanvas.height = theSvgCanvas.height;

      // console.log("CANVAS HAS SIZE " + theSvgImage.width);

      // const canvasCtx = gsRenderCanvas.getContext('2d')!;
      // canvasCtx.drawImage(theSvgImage, 0, 0);

      // const svgImageData = canvasCtx?.getImageData(0, 0, theSvgImage.width, theSvgImage.height);

      // console.log("PRE-convertToGrayscale: " + svgImageData);

      // console.log("theSvgImage.width - " + theSvgImage.width)
      // console.log("svgImage.width - " + svgImageData.width);

      // const gsData = convertToGrayscale({
      //   imageData: svgImageData!,
      //   conversionAlgorithm: GrayscaleConversionAlgorithm.average,
      //   imageLabel: props.gsImageLabel,
      // });

      // console.log("SETTING GS DATAW: "+ gsData.imageWidthInPixels + " " + props.gsImageLabel);
      // console.log("SETTING GS DATAH: "+ gsData.imageHeightInPixels);

      // props.onGsConvertedData(gsData);

    } catch (e) {
      console.log("CANVAS ERROR: " + e);
    }
  }

  // const handleSvgImageLoaded = (imgLoadEvent: React.SyntheticEvent<HTMLImageElement, Event>) => {
  //   console.log("handleSvgImageLoaded xxx")
  //   console.log(imgLoadEvent);

  //   doGrayscaleWork(imgLoadEvent.target);
  // }

  return (
    <div style={{
      width: UI_IMAGE_WIDTH,
      height: UI_IMAGE_HEIGHT,
      // transformOrigin: "0 0",
      // WebkitTransform: "scale(" + UI_IMAGE_SCALING_FACTOR + ")",
      }}>

      <img 
        ref={imageRef}
        src={props.svgAsDataUrl}
        // onLoad={(thisImg) => handleSvgImageLoaded(thisImg)}
        onLoad={doGrayscaleWork}
        // height={UI_IMAGE_HEIGHT * 0.1}
        // width={UI_IMAGE_WIDTH * 0.1}
        height={0}
        width={0}
        />
      </div>
  )
}
