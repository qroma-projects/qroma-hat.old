---
title: Web Serial Not Supported
---

# Web Serial Not Supported

If you are seeing this page, it's probably because you found a link saying that Web Serial isn't supported. This means your browser doesn't support the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API">Web Serial API</a> required for this webpage to connect to this Qroma project.


import BrowserOnly from '@docusaurus/BrowserOnly';
import { WebSerialSupportBadge } from "../react-qroma-lib/qroma-lib/navbar-connection/WebSerialSupportBadge";


<BrowserOnly>
{() => <WebSerialSupportBadge />
  
}
</BrowserOnly>