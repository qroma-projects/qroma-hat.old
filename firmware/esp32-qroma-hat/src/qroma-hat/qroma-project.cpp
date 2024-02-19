#include "qroma-project.h"
#include "qroma-commands.h"
#include "qroma/qroma.h"
#include "eink/image_types.h"
#include "eink/eink-screen.h"


AppCommandProcessor<
  MyProjectCommand, MyProjectCommand_fields,
  MyProjectResponse, MyProjectResponse_fields
> myAppCommandProcessor(onMyProjectCommand);

QromaSerialCommApp myQromaApp;

extern UpdateConfiguration updateConfiguration;


int vref = 1100;

HatImageData activeImage = {
  .imageWidth = EINK_WIDTH,
  .imageHeight = EINK_HEIGHT,
  .imageData = NULL,
  .imageLabel = "IMAGE NOT SET",
};


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
  // updateConfiguration.updateType = UpdateType_UpdateType_Interval;
  updateConfiguration.updateType = UpdateType_UpdateType_None;

  // Correct the ADC reference voltage
    esp_adc_cal_characteristics_t adc_chars;
#if defined(T5_47)
    esp_adc_cal_value_t val_type = esp_adc_cal_characterize(
        ADC_UNIT_1,
        ADC_ATTEN_DB_11,
        ADC_WIDTH_BIT_12,
        1100,
        &adc_chars
    );
#else
    esp_adc_cal_value_t val_type = esp_adc_cal_characterize(
        ADC_UNIT_2,
        ADC_ATTEN_DB_11,
        ADC_WIDTH_BIT_12,
        1100,
        &adc_chars
    );
#endif
    if (val_type == ESP_ADC_CAL_VAL_EFUSE_VREF) {
        Serial.printf("eFuse Vref: %umV\r\n", adc_chars.vref);
        vref = adc_chars.vref;
    }

#if defined(T5_47_PLUS)
    Wire.begin(TOUCH_SDA, TOUCH_SCL);
    rtc.begin();
    rtc.setDateTime(2022, 6, 30, 0, 0, 0);
#endif

    logInfo("INIT QROMA HAT CONFIG");

    logInfo("PRE-EPDINIT");
    epd_init();
    logInfo("POST-EPDINIT");

    uint8_t * activeImageBuffer = initActiveImageBuffer();
    activeImage.imageData = activeImageBuffer;

  if (!doesFileExist(QROMA_HAT_UPDATE_CONFIG_FILENAME)) {
    bool saved = savePbToPersistence(&updateConfiguration, QROMA_HAT_UPDATE_CONFIG_FILENAME, UpdateConfiguration_fields);
    if (!saved) {
      logError("ERROR SAVING INITIAL UPDATE CONFIG");
    }
  }
}


void sendUptimeUpdateResponse() {
  MyProjectResponse myProjectResponse = MyProjectResponse_init_zero;
  myProjectResponse.which_response = MyProjectResponse_updateResponse_tag;
  // myProjectResponse.response.updateResponse.which_update = UpdateResponse_uptimeUpdateResponse_tag;
  myProjectResponse.response.updateResponse.boardUptimeInMs = millis();

  myQromaApp.sendQromaAppResponse<MyProjectResponse, MyProjectResponse_fields>(&myProjectResponse);

  logInfo("Update from qroma-hat");
}


void qromaProjectLoop()
{
  delay(updateConfiguration.updateIntervalInMs);

  switch (updateConfiguration.updateType) {
    case UpdateType_UpdateType_Interval:
      sendUptimeUpdateResponse();
      break;

    default:
      break;
  }
}