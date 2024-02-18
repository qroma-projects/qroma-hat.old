import React from 'react';
import { QromaPageAppContext } from '../react-qroma-lib/qroma-lib/page-app/QromaPageAppContext';
import { _createQromaPageApp } from '../react-qroma-lib/qroma-lib/page-app/QromaPageApp';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

console.log("IN ROOT OF APP")


export const Root = ({children}) => {

  if (ExecutionEnvironment.canUseDOM) {
    const qromaPageApp = _createQromaPageApp();

    return (
      <QromaPageAppContext.Provider value={qromaPageApp}>
        {children}
      </QromaPageAppContext.Provider>
    )
  } else {
    return (
      <div>
        THIS SHOULD BE BROWSER ONLY
      </div>
    )
  }
}

export default Root;