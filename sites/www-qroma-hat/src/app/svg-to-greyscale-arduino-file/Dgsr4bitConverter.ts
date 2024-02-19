import { UInt4, UInt8 } from "bitwise/types"
import { GrayscaleConversionOutput } from "./GrayscaleConverter"


const MAX_RUN_LENGTH_FOR_SHORT_RUN  = 0b00111111;
const MAX_RUN_LENGTH_FOR_MEDIUM_RUN = 0b0011111111111111;
const MAX_RUN_LENGTH_FOR_LONG_RUN   = 0b00111111111111111111111111111111;

const TWO_TO_THE_9TH = 0b100000000;
const TWO_TO_THE_17TH = 0b10000000000000000;
const TWO_TO_THE_25TH = 0b1000000000000000000000000;
const TWO_TO_THE_31ST = 0b1000000000000000000000000000000;



export interface DgsrConverterInputs {
  gsData: GrayscaleConversionOutput
}

export interface PixelRun {
  gsValue: UInt4
  runLengthInPixels: number
  
  opPlacePixelByte: UInt8
  opRunLength: UInt8[]

  runBytes: Uint8ClampedArray
}

export interface DgsrConverterOutput {
  
  readonly dataAsUint8Array: Uint8ClampedArray
  readonly pixelRuns: PixelRun[]

  /** Returns the actual dimensions of the image in pixels. */
  readonly imageHeightInPixels: number
  readonly imageWidthInPixels: number

  readonly imageLabel: string
}


export const createOpPlacePixelByte = (gsValue: UInt4): UInt8 => {
  return gsValue;
}


export const createShortOpRunByte = (pixelCount: number): UInt8 => {
  return (2**6 + pixelCount) as UInt8;
}


export const createMediumOpRunBytes = (pixelCount: number): UInt8[] => {
  const lowByte = pixelCount % TWO_TO_THE_9TH as UInt8;
  const highByte = (2**7) + Math.floor(pixelCount / TWO_TO_THE_9TH) as UInt8;
  return [highByte, lowByte];
}


export const createLongOpRunBytes = (pixelCount: number): UInt8[] => {
  const lowByte1 = pixelCount % TWO_TO_THE_9TH as UInt8;

  const lowBytes2 = pixelCount % TWO_TO_THE_17TH;
  const lowByte2 = Math.floor(lowBytes2 / TWO_TO_THE_9TH) as UInt8;

  const lowBytes3 = pixelCount % TWO_TO_THE_25TH;
  const lowByte3 = Math.floor(lowBytes3 / TWO_TO_THE_17TH) as UInt8;

  const highByteValue = Math.floor(pixelCount / TWO_TO_THE_25TH) as UInt8;
  const highByte = (2**7 + 2**6) + highByteValue as UInt8;

  return [
    highByte,
    lowByte3,
    lowByte2,
    lowByte1
  ];
}


export const createOpRunBytes = (pixelCount: number): UInt8[] => {
  if (pixelCount <= MAX_RUN_LENGTH_FOR_SHORT_RUN) {
    return [createShortOpRunByte(pixelCount)];
  }
  if (pixelCount <= MAX_RUN_LENGTH_FOR_MEDIUM_RUN) {
    return createMediumOpRunBytes(pixelCount);
  }
  if (pixelCount <= MAX_RUN_LENGTH_FOR_LONG_RUN) {
    return createLongOpRunBytes(pixelCount);
  }

  throw new Error("Pixel count is too high to create Op Run: " + pixelCount);
}


export const convert4bitGrayscaleToDgsr = (inputs: DgsrConverterInputs): DgsrConverterOutput => {

  const dgsrBytes = [] as UInt8[];
  const pixelRuns = [] as PixelRun[];

  const gsData = inputs.gsData;
  const dataAsNibbles = inputs.gsData.dataAsNibbles;

  let previousPixel = dataAsNibbles[0];
  let pixelCount = 0;
  
  for (let i=0; i < dataAsNibbles.length; i++) {
    if (dataAsNibbles[i] === previousPixel) {
      pixelCount++;
    } else {
      const ppb = createOpPlacePixelByte(previousPixel);
      const rbs = createOpRunBytes(pixelCount);
      dgsrBytes.push(ppb);
      dgsrBytes.push(...rbs);

      pixelRuns.push({
        gsValue: previousPixel,
        runLengthInPixels: pixelCount,
        opPlacePixelByte: ppb,
        opRunLength: rbs,
        runBytes: new Uint8ClampedArray([ppb, ...rbs]),
      });

      pixelCount = 1;
      previousPixel = dataAsNibbles[i];
    }
  }

  if (pixelCount > 0) {
    const ppb = createOpPlacePixelByte(previousPixel);
    const rbs = createOpRunBytes(pixelCount);
    dgsrBytes.push(ppb);
    dgsrBytes.push(...rbs);
    pixelRuns.push({
      gsValue: previousPixel,
      runLengthInPixels: pixelCount,
      opPlacePixelByte: ppb,
      opRunLength: rbs,
      runBytes: new Uint8ClampedArray([ppb, ...rbs]),
    });
  }

  return {
    imageHeightInPixels: gsData.imageHeightInPixels,
    imageWidthInPixels: gsData.imageWidthInPixels,
    imageLabel: gsData.imageLabel,
    dataAsUint8Array: new Uint8ClampedArray(dgsrBytes),
    pixelRuns,
  };
}


export const create4bitDgsrDataStr = (dgsrData: DgsrConverterOutput) => {
  
  const dgsrByteStrs = [];
  const dgsrBytes = dgsrData.dataAsUint8Array;

  for (let i=0; i < dgsrBytes.length; i++) {
    let dgsrByteStr = dgsrBytes[i].toString(16);
    if (dgsrByteStr.length < 2) {
      dgsrByteStr = "0" + dgsrByteStr;
    }
    const dgsrHexByteStr = "0x" + dgsrByteStr;
    dgsrByteStrs.push(dgsrHexByteStr)
  }

  return dgsrByteStrs
           .join(',');
}


const createHexByteStr = (hexValue: UInt8): string => {
  let byteStr = hexValue.toString(16);
  if (byteStr.length < 2) {
    byteStr = "0" + byteStr;
  }
  const hexByteStr = "0x" + byteStr;
  return hexByteStr;
}


const createPixelRunBytesLine = (pixelRun: PixelRun): string => {
  const opPlacePixel = createHexByteStr(pixelRun.opPlacePixelByte);
  const opRun = pixelRun.opRunLength.map(createHexByteStr).join(", ");

  const pixelRunBytesLine = `${opPlacePixel}, ${opRun},   // OP_PLACE GS: ${pixelRun.gsValue}, OP_RUN LENGTH: ${pixelRun.runLengthInPixels}`;
  return pixelRunBytesLine;
  // let dgsrByteStr = pixelRuns[i].toString(16);
  // if (dgsrByteStr.length < 2) {
  //   dgsrByteStr = "0" + dgsrByteStr;
  // }
  // const dgsrHexByteStr = "0x" + dgsrByteStr;
  // dgsrByteStrs.push(dgsrHexByteStr)
}


export const create4bitDgsrAllPixelRunsBytesStr = (dgsrData: DgsrConverterOutput) => {
  
  console.log("PIXEL RUNS");
  console.log(dgsrData.pixelRuns);

  const pixelRunLines = dgsrData.pixelRuns.map(createPixelRunBytesLine);
  console.log(pixelRunLines);

  const retVal = pixelRunLines.join('\n');
  return retVal;


  // const pixelRunByteLines = [] as string[];
  // const pixelRuns = dgsrData.pixelRuns;

  // for (let i=0; i < pixelRuns.length; i++) {
  //   const line = createPixelRunBytesLine(pixelRuns[i]);
  //   // let dgsrByteStr = pixelRuns[i].toString(16);
  //   // if (dgsrByteStr.length < 2) {
  //   //   dgsrByteStr = "0" + dgsrByteStr;
  //   // }
  //   // const dgsrHexByteStr = "0x" + dgsrByteStr;
  //   // dgsrByteStrs.push(dgsrHexByteStr)
  //   pixelRunByteLines.push(line);
  // }

  // return pixelRunByteLines
  //          .join('\n');
}
