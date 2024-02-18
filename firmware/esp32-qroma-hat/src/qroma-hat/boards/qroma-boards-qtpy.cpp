#ifdef QROMA_BOARD_DEF_QTPY_ESP32_C3

#ifndef QBD_QTPY_ESP32
#define QBD_QTPY_ESP32

#include <Adafruit_NeoPixel.h>
#include "qroma-boards.h"


#define NUMPIXELS        1

Adafruit_NeoPixel pixels(NUMPIXELS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);


void setOnboardLightColor(int r, int g, int b) {
  uint32_t color = (r << 16) + (g << 8) + b;

  pixels.fill(color);
  pixels.show();
}


void onInit() {
  pixels.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  pixels.setBrightness(20); // not so bright

  setOnboardLightColor(100, 20, 20);
}

const char * getBoardName() {
  return "Adafruit QT Py Firmware";
}


void handleSetBoardLightColorRequest(SetBoardLightColorRequest * request, SetBoardLightColorResponse * response) {
  response->success = true;
  strncpy(response->message, "", sizeof(response->message));
  setOnboardLightColor(request->red, request->green, request->blue);
}

#endif

#endif