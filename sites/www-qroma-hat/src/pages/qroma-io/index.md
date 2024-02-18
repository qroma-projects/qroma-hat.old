---
title: Qroma Comm Types
---

# Qroma IO Root MD

Let's put Qroma automation stuff with parameters here!

[Send App Message](./sendAppMessage)

[Send Qroma Message](./sendQromaMessage)

[Add Qroma File](./addQromaFile)

[Show Qroma File](./showQromaFile)


**TODO**

* `/qromaComm` - request/response comm config object
* `/addQromaFileAsAppType/#/$filePath?AppType={}`


**Done**

* (Done) heartbeat at QromaComm layer
* (Done) `/sendQromaMessage/B64/#/ABCDE=`
* (Done) `/addQromaFile/#/$filePath!B64Content=`
* (Done) `/sendAppMessage/B64/#/ABCDE=`
* (Done) `/showQromaFile/#/$filePath?renderAs={B64, B64Url}`
* (Done via MD page and config props)`/showQromaFileAsAppType/#/$filePath?AppType={}`


**Notes**

Valid B64 characters: + / =

Base64 URL?
Use @ or # or /#/? 