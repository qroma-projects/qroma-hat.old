import React from 'react';
import { useQromaHatApi } from '../api/QromaHatApi';
import { useQromaCommFileSystemApi } from '../../react-qroma-lib/qroma-lib/file-explorer/QromaCommFileSystemApi';
import { SvgToGreyscaleFileUploader } from './SvgToGreyscaleFileUploader';


export const SvgToGreyscaleFileUploadApp = () => {

  const qromaHatApi = useQromaHatApi();
  const qromaCommFilesystemApi = useQromaCommFileSystemApi();

  return (
    <>
      <SvgToGreyscaleFileUploader
        qromaHatApi={qromaHatApi}
        qromaCommFilesystemApi={qromaCommFilesystemApi}
        />
    </>
  )
}
