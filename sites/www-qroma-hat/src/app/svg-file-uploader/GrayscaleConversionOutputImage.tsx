import React, { useEffect, useRef, useState } from 'react';
import { IComponentState } from './ComponentState';
import { UI_IMAGE_HEIGHT, UI_IMAGE_SCALING_FACTOR, UI_IMAGE_WIDTH } from './constants';


export const GrayscaleConversionOutputImage = (
  { componentState} : {componentState: IComponentState}
) => {

  const gsData = componentState.grayscaleData;

  // const [imageHeight, setImageHeight] = useState(0);
  // const [imageWidth, setImageWidth] = useState(0);

  const [canvasDataAsUrl, setCanvasDataAsUrl] = useState("");

  console.log("RENDERING GrayscaleConversionOutputImage");
  // const canvasRef = useRef(null);
  // console.log("RENDERING 2 GrayscaleConversionOutputImage");

  useEffect(() => {

    // if (canvasRef.current === null) return;

    console.log("IN USE EFFECT");
    // console.log("CANVASREF VALUE: " + canvasRef);
    // const myCanvas = canvasRef.current!;
    // console.log("GOT CANVAS REF");
    const myCanvas = document.createElement("canvas");
    console.log(myCanvas);
    myCanvas.width = gsData.imageWidthInPixels;
    myCanvas.height = gsData.imageHeightInPixels;

    const myCanvasCtx = myCanvas.getContext('2d');
    if (myCanvasCtx === null) return;

    console.log("CANVAS CTX: " + myCanvasCtx);
    var imageData = myCanvasCtx.createImageData(
      gsData.imageWidthInPixels, gsData.imageHeightInPixels);
    console.log("IMAGE DATA: " + imageData);
    // console.log("ASSIGNING IMAGE SIZE: " + gsData.imageWidthInPixels + " : " + gsData.imageHeightInPixels + " : " + gsData.dataAsUint8Array)

    for (let i = 0; i < gsData.dataAsNibbles.length; i++) {
      const nibble = gsData.dataAsNibbles[i];
      const p1 = nibble * 16;

      const p1Index = (i * 4);

      imageData.data[p1Index] = p1;     // red
      imageData.data[p1Index + 1] = p1; // green
      imageData.data[p1Index + 2] = p1; // blue
      imageData.data[p1Index + 3] = 255;

      if (i < 960) {
        // console.log(`PIXEL [0, ${i}] >>> ${p1}`);
      }
    }

    myCanvasCtx.putImageData(imageData, 0, 0);

    // var target = new Image();
    const canvasDataUrl = myCanvas.toDataURL();
    console.log("CANVAS");
    console.log(myCanvas);
    // console.log("canvasDataUrl: " + canvasDataUrl);
    setCanvasDataAsUrl(canvasDataUrl);

    // setImageHeight(gsData.imageHeightInPixels);
    // setImageWidth(gsData.imageWidthInPixels);

    console.log(`SETTING CANVAS HEIGHT: ${gsData.imageHeightInPixels}`);
    console.log(`SETTING CANVAS WIDTH: ${gsData.imageWidthInPixels}`);
  }, [componentState.grayscaleData]);

  return (
    <>
      <div style={{
        width: UI_IMAGE_WIDTH,
        height: UI_IMAGE_HEIGHT,
        // transformOrigin: "0 0",
        // WebkitTransform: "scale(" + UI_IMAGE_SCALING_FACTOR + ")",
        }}>

          {/* <canvas 
            ref={canvasRef}
            height={imageHeight}
            width={imageWidth}
            /> */}
          <img
            src={canvasDataAsUrl}
            // height={imageHeight}
            // width={imageWidth}
            />
        </div>
    </>
  )
}