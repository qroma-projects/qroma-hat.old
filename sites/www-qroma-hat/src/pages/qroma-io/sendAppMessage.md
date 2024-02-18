---
title: Send Qroma App Message
---

# Qroma Send App Message MD

import BrowserOnly from '@docusaurus/BrowserOnly';
import { MyProjectCommand, MyProjectResponse } from "../../qroma-proto/my-project-messages";
import { QromaIoSendAppMessageComponent } from "../../react-qroma-lib";

<BrowserOnly>
{() =>
  <QromaIoSendAppMessageComponent
    requestMessageType={MyProjectCommand}
    responseMessageType={MyProjectResponse}
    />
}
</BrowserOnly>