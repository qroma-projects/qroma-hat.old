import React, { useEffect } from 'react';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import { IComponentState } from './ComponentState';
import { GrayscaleConversionOutputImage } from './GrayscaleConversionOutputImage';
import { ArduinoOutputView } from './ArduinoOutputView';
import { convertToGrayscale, GrayscaleConversionAlgorithm, GrayscaleConversionOutput } from './GrayscaleConverter';
import { UI_IMAGE_HEIGHT, UI_IMAGE_WIDTH } from './constants';
import { svgToDataURI } from './svgToDataUri';
import { SvgGsConversionImg } from './SvgGsConversionImg';
import { ArduinoDgsrOutputView } from './ArduinoDgsrOutputView';


interface ImageOutputViewProps {
  componentState: IComponentState
  onNewGrayscaleData: (gsData: GrayscaleConversionOutput) => void
  onNewSvgImageAsDataUrl: (dataUrl: string) => void
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const CANVAS_ID = "canvas-ImageOutputView";


const SvgTextPanel = ({svgInputText}: {svgInputText: string}) => {

  console.log("svgInputText");
  console.log(svgInputText);

  return (
    <>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="SVG Input"
          multiline
          // defaultValue={svgInputText}
          value={svgInputText}
          fullWidth={true}
          // onChange={(event) => setSvgInputText(event.target.value)}
          inputProps={{
            style: {
              fontFamily: 'monospace',
              height: '250px',
              overflow: 'scroll',
            }
          }}
        />
      </div>
    </>
  )
}

export const ImageOutputView = (props: ImageOutputViewProps) => {
  // console.log("FRESH RENDER");
  // console.log(props.svgImageText)
  // console.log(props.componentState.svgImageText);

  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const doGrayscaleWork = (theSvgImage: HTMLImageElement) => {
    try {
      const gsRenderCanvas = document.createElement('canvas');

      const canvasCtx = gsRenderCanvas.getContext('2d')!;
      canvasCtx.drawImage(theSvgImage, 0, 0);

      const svgImageData = canvasCtx?.getImageData(0, 0, theSvgImage.width, theSvgImage.height);

      const gsData = convertToGrayscale({
        imageData: svgImageData!,
        conversionAlgorithm: GrayscaleConversionAlgorithm.average,
        imageLabel: props.componentState.gsImageLabel,
      });

      props.onNewGrayscaleData(gsData);

    } catch (e) {
      console.log("CANVAS ERROR: " + e);
    }
  }

  const doSvgImageWork = async () => {
    var theSvgImage = document.createElement("img");

    const theSvgDataUri = svgToDataURI(props.componentState.svgImageText);

    theSvgImage.onload = async () => {
      
      let reader = new FileReader();
      const svgImageBlob = new Blob([props.componentState.svgImageText], {
        type: 'image/svg+xml'
      });

      reader.readAsDataURL(svgImageBlob);
      reader.onload = function() {
        const resultData = reader.result as string;
        
        doGrayscaleWork(theSvgImage);
        props.onNewSvgImageAsDataUrl(resultData);
      };

    }

    theSvgImage.src = theSvgDataUri;
  }

  const onGsConvertedData = (gsData: GrayscaleConversionOutput) => {
    props.onNewGrayscaleData(gsData);
  }

  useEffect(() => {
    const doTheEffect = async () => {
      await doSvgImageWork();
    }

    doTheEffect();
  
  }, [props.componentState.svgImageText]);

  return (
    <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', height: 400 }}>
      <canvas 
        id={CANVAS_ID}
        height={0} 
        width={0}
        />

      <div style={{
        width: 0,
        height: 0,
        }}>

        <SvgGsConversionImg 
          svgAsDataUrl={props.componentState.svgImageAsDataUrl}
          gsImageLabel={props.componentState.gsImageLabel}
          onGsConvertedData={onGsConvertedData}
          />

      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="scrollable"
          >
          <Tab label="SVG Text" {...a11yProps(0)} />
          <Tab label="SVG Image" {...a11yProps(1)} />
          <Tab label="Grayscale" {...a11yProps(2)} />
          {/* <Tab label="Arduino" {...a11yProps(3)} />
          <Tab label="Arduino/DGSR" {...a11yProps(4)} /> */}
          <Tab label="Upload" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SvgTextPanel
          svgInputText={props.componentState.svgImageText}
          />
      </TabPanel>
      <TabPanel value={value} index={1}>      
        <div style={{
          width: UI_IMAGE_WIDTH,
          height: UI_IMAGE_HEIGHT,
          }}>

          <img 
            src={props.componentState.svgImageAsDataUrl}
            />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GrayscaleConversionOutputImage 
          componentState={props.componentState}
          />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <ArduinoOutputView 
          gsData={props.componentState.grayscaleData}
          svgTemplateInputs={props.componentState.svgTemplateInputs}
          />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ArduinoDgsrOutputView 
          gsData={props.componentState.grayscaleData}
          svgTemplateInputs={props.componentState.svgTemplateInputs}
          />
      </TabPanel> */}
      <TabPanel value={value} index={3}>
      {/* <ArduinoDgsrOutputView 
        gsData={props.componentState.grayscaleData}
        svgTemplateInputs={props.componentState.svgTemplateInputs}
        /> */}
        <div>Upload</div>
      </TabPanel>
    </Box>
    </>
  )
}
