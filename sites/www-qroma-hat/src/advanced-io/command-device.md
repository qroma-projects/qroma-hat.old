---
title: Command Device - Advanced
displayed_sidebar: advancedIoSidebar
---

# Command Device

import BrowserOnly from '@docusaurus/BrowserOnly';
import { MyProjectCommand, MyProjectResponse } from "../qroma-proto/my-project-messages";
import { QromaCommandDeviceApp } from "../react-qroma-lib";

<BrowserOnly>
{() =>
  <QromaCommandDeviceApp
    requestMessageType={MyProjectCommand}
    responseMessageType={MyProjectResponse}
    />
}
</BrowserOnly>