#include "qroma-project.h"
#include "qroma-commands.h"
#include "qroma/qroma.h"


AppCommandProcessor<
  MyProjectCommand, MyProjectCommand_fields,
  MyProjectResponse, MyProjectResponse_fields
> myAppCommandProcessor(onMyProjectCommand);

QromaSerialCommApp myQromaApp;

extern FwUpdateConfiguration updateConfiguration;


void qromaProjectSetup()
{
  myQromaApp.setAppCommandProcessor(&myAppCommandProcessor);

  myQromaApp.configureSerialCommIo([](QromaCommSerialIoConfig * config) {
    config->baudRate = 115200;
    config->rxBufferSize = 1000;
    config->txBufferSize = 1000;
  });

  myQromaApp.configureQromaApp([](QromaAppConfig * config) {
    config->loggerConfig.logLevel = Qroma_LogLevel_LogLevel_Info;
  });

  myQromaApp.startupQroma();

  updateConfiguration.updateIntervalInMs = 1000;
  // updateConfiguration.updateType = UpdateType_UpdateType_ProgressIndicator;
  // updateConfiguration.updateType = UpdateType_UpdateType_Interval;
  updateConfiguration.updateType = UpdateType_UpdateType_None;

  if (!doesFileExist(QROMA_BOARDS_UPDATE_CONFIG_FILENAME)) {
    bool saved = savePbToPersistence(&updateConfiguration, QROMA_BOARDS_UPDATE_CONFIG_FILENAME, FwUpdateConfiguration_fields);
    if (!saved) {
      logError("ERROR SAVING INITIAL UPDATE CONFIG");
    }
  }
}



int updateCounter = 0;


void sendUptimeUpdateResponse() {
  MyProjectResponse myProjectResponse = MyProjectResponse_init_zero;
  myProjectResponse.which_response = MyProjectResponse_updateResponse_tag;
  myProjectResponse.response.updateResponse.which_update = UpdateResponse_uptimeUpdateResponse_tag;
  myProjectResponse.response.updateResponse.update.uptimeUpdateResponse.uptime = millis();

  myQromaApp.sendQromaAppResponse<MyProjectResponse, MyProjectResponse_fields>(&myProjectResponse);

  logInfo("Update from qroma-hat");
}

void sendProgressUpdateResponse() {
  MyProjectResponse myProjectResponse = MyProjectResponse_init_zero;
  myProjectResponse.which_response = MyProjectResponse_updateResponse_tag;
  myProjectResponse.response.updateResponse.which_update = UpdateResponse_progressIndicatorUpdateResponse_tag;

  myProjectResponse.response.updateResponse.update.progressIndicatorUpdateResponse.progressIndicator[0] = '.';
  int dotCount = updateCounter % 45;
  for (int i=1; i < dotCount; i++) {
    myProjectResponse.response.updateResponse.update.progressIndicatorUpdateResponse.progressIndicator[i] = '.';
  }

  myQromaApp.sendQromaAppResponse<MyProjectResponse, MyProjectResponse_fields>(&myProjectResponse);

  logInfo("sendProgressUpdateResponse() complete");
}


void qromaProjectLoop()
{
  delay(updateConfiguration.updateIntervalInMs);
  updateCounter++;

  switch (updateConfiguration.updateType) {
    case UpdateType_UpdateType_Interval:
      sendUptimeUpdateResponse();
      break;
    case UpdateType_UpdateType_ProgressIndicator:
      sendProgressUpdateResponse();
      break;
    default:
      break;
  }
}