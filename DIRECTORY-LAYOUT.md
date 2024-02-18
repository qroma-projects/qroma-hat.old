# Project Layout

## Directories

OK, we admit it, there are a daunting number of directories at the root here. But let's face it, if you want to work with embedded systems, you've signed up for a little complexity. A lot of it is because your little device doesn't have any direct way to communicate with its users. It doesn't even really know who its users are, because it responds to physical inputs, not necessarily API requests. So, to compensate, qroma projects support multiple methods for users to communicate with your device. 

These directories exist to support those different methods and manage the complexity of keeping all these pieces organized.


### qroma.toml

This is where metadata for organizing the project information goes. Think of it like `package.json` (from the NodeJS/npm world) as a single point of configuration entry that ties all the pieces together.


### device-io

This is the heart of the project. We assume that if you want an embedded system that will have some user interaction, DRY (Don't Repeat Yourself) is super important. We use Protocol Buffer Interface Definition Language by default since there are options to go to C with pretty small code size and they support lots of other languages as well.

You will be defining your commands, responses, and settings here. Once they are established (or need updating), you can regenerate them and all connected applications will see the new definitions.


### devices

This is the directory for your embedded device applications with a directory name convention `dev-$BOARDNAME-$FRAMEWORK-$PROJECTNAME`. The outputs for embedded device applications will be compiled binaries and board metadata so they can be loaded onto their boards by assemblers.


### sites

This is the directory for your web site(s) with a directory name convention `www-$PROJECTNAME-$DOMAINNAME`. 

Once we discovered WebSerial was a serious option for loading ESP32 binaries onto embedded devices and could be used for device IO via webpage, websites became a first class option since the tools for developing them are so pervasive, powerful, and easy to develop with. We start with a docusaurus site that includes placeholders for everything, but it can be tweaked/customized as desired.

Self hosting on WiFi devices is also an option that can be loaded/supported with the built-in Qroma filesystem.

Options include:
* User interface pages
  * Device connection options
  * Commands
  * Settings and configuration
  * Monitoring
* Project inspiration/origin story
* Project members/contributors
* Bill of Materials
* Assembly instruction pages
* Technical support pages
* Store pages


### apps

A place to keep your smartphone and desktop apps with directory name convention `app-$FRAMEWORKNAME-$PROJECTNAME`. There are lots of frameworks to choose from - qroma uses Flutter as the default since it supports iOS and Android well and has some decent Bluetooth libraries available. 


### tests

We all know they should happen. And you're writing one-off apps and scripts that help you test anyway. So put them here. We have been using Python with its supporting protobufs as our integration test platform of choice with directory name convention `py-test-$PROJECTNAME`.