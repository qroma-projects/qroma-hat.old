import React, { ChangeEvent, useState } from 'react';
// import { QButton } from '../react-qroma-mui/input-controls/QButton';
import { IQromaHatApi } from './api/QromaHatApi';
import { IQromaCommFilesystemApi } from '../react-qroma-lib/qroma-lib/file-explorer/QromaCommFileSystemApi';
import { DirItem } from '../react-qroma-lib';
import { IComponentState } from './svg-file-uploader/ComponentState';
import { createDgsrImageFileBytes } from './svg-file-uploader/dgsr_file_bytes_factory';


export interface IConnectToDevicePanelProps {
  qromaHatApi: IQromaHatApi
  qromaCommFilesystemApi: IQromaCommFilesystemApi

  state: IComponentState
}


export const ConnectToDevicePanel = (props: IConnectToDevicePanelProps) => {
  
  const [dirItems, setDirItems] = useState([] as DirItem[]);
  const [activeDirPath, setActiveDirPath] = useState("...");

  const [fileBytes, setFileBytes] = useState(null as Uint8Array | null);
  const [fileName, setFileName] = useState("");

  
  const doQromaConnect = async () => {
    props.qromaHatApi.init();
    // props.qromaCommFilesystemApi.init();
  };

  const doQromaHatUpload = async () => {
    console.log("DO HAT UPLOAD");
  }

  const doDgsrSave = async () => {
    console.log("DO DGSR SAVE");
    console.log(props.state.grayscaleData)

    const uploadFileBytes = createDgsrImageFileBytes(props.state.grayscaleData);
    console.log(uploadFileBytes)

    const blob = new Blob([uploadFileBytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.bin'; // Change the file name as needed
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  const doFileUpload = async () => {
    if (fileBytes !== null) {
      props.qromaCommFilesystemApi.writeFileContents("/" + fileName, fileBytes);
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        // this.setState({ bytes });
        setFileBytes(bytes);
        setFileName(file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const listFiles = async () => {
    console.log("LIST FILES")
    const dirResult = await props.qromaCommFilesystemApi.listDir("/");
    if (dirResult && dirResult.success) {
      setDirItems(dirResult.dirItems);
      setActiveDirPath(dirResult.dirPath);
    }
    console.log("DIR RESULT");
    console.log(dirResult);
  }

  if (props.qromaHatApi.connectionState.isWebSerialConnected) {
    return (
      <>
        <button
          onClick={() => doQromaHatUpload()}>
            Upload
        </button>
        <button
          onClick={() => listFiles()}>
            List Files - {dirItems.length}
        </button>
        <button
          onClick={() => doDgsrSave()}>
            File Save
        </button>
        
        <button
          onClick={() => doFileUpload()}>
            File Upload
        </button>
        <div>
          <input type="file" onChange={handleFileInputChange} />
          {fileBytes && (
            <div>
              <h2>File ({fileName}) Loaded Successfully!</h2>
              {/* <p>Byte Array: {fileBytes.join(', ')}</p> */}
              <p>Byte Array: {fileBytes.length}</p>
            </div>
          )}
      </div>
      </>
    )
  }
  
  
  return (
    <>
      <button
        onClick={() => doQromaConnect()}>
          Connect
      </button>
    </>
  )
}
