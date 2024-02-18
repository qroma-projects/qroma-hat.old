# Getting Started

You have an embedded device project idea and you are impatient to get it started. Well, there can be a lot to consider, so review this TODO list below to make sure you won't regret your haste later...

## TODOs


### Choose an embedded development platform
Qroma projects have support for Arduino and Platform IO projects. Available libraries and board support are important factors when it comes to deciding what frameworks to use, so we focus on supporting some simple development paths and getting the binary outputs.
  * ESP32 boards are supported
  * Any board can be supported - the main requirement of the embedded platform is to build a binary to install and supply metadata about how to install

Since there are lots of boards supporting wireless communication, Qroma projects focus on user interactions across multiple user platforms (while only implementing a single set of commands, though!)
  * Bluetooth Low Energy (BLE)
  * Wifi
  * Serial

[Learn more here](./devices/README.md)


### Decide your input commands and sensor/information outputs
Chances are good your project is going to want to be connected to people somehow in some way. Now is a good time to start to rough out the logical components, their commands (and responses), how to configure them, and the information they can send to interested applications and/or endpoints.

[Learn more here](./device-io/protobufs/README.md)


### Decide from where your users will command, configure, and monitor devices
PCs, laptops, smartphones, tablets, etc. with USB/serial, WiFi, Bluetooth. 

Your users have lots of device options. Those devices have lots of communication options. General communication is hard. Software communication is harder. Cross-device communication is even harder.

How are you going to present your device's commands and parameters to your users? How are you going to take this one configuration you made for this device and blast it onto a dozen other devices? How are you going to monitor what this device is doing? 

What if your user needs to interact with your device at their desk vs. the toilet? Maybe you should be able to see the same data and events the same way across different platforms. Qroma projects support all these user interactions:
* Web pages over device-hosted WiFi
* BLE with native apps (requires Qromatech integration)
* USB/Serial communication via apps and web pages (supported on certain web browsers, requires Qromatech integration for some features)


### Make security part of your development process
Qromatech is designed to support flexible and rapid development, but not by taking security shortcuts. No single communication method is required and can be tailored based on your deployment profile.

Configuring different communication methods to be on and off as part of a device build is part of the project configuration process and can be changed throughout the lifecycle of a project. 
