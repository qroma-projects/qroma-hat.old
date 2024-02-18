---
title: Qroma Lights Config
---

# Qroma Lights Config MD

import BrowserOnly from '@docusaurus/BrowserOnly';
import { QromaCommConfig } from "../../react-qroma-lib/qroma-comm-proto/qroma-config";
import { QromaIoShowQromaFileAsMessageTypeComponent } from "../../react-qroma-lib";

<BrowserOnly>
{() =>
  <QromaIoShowQromaFileAsMessageTypeComponent
    fileMessageType={QromaCommConfig}
    filePath="/comm-config.qroma"
    />
}
</BrowserOnly>