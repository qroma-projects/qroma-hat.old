#ifdef QROMA_BOARD_DEF_TINYPICO_ESP32

#ifndef QBD_TINYPICO_ESP32
#define QBD_TINYPICO_ESP32

#include <TinyPICO.h>
#include "qroma-boards.h"


// Initialise the TinyPICO library
TinyPICO tp = TinyPICO();


void setOnboardLightColor(int r, int g, int b) {
  tp.DotStar_SetPixelColor(r, g, b);
}

void onInit() {
  setOnboardLightColor(0, 60, 100);
}

const char * getBoardName() {
  return "UM TinyPICO Firmware";
}


void handleSetBoardLightColorRequest(SetBoardLightColorRequest * request, SetBoardLightColorResponse * response) {
  response->success = true;
  strncpy(response->message, "", sizeof(response->message));
  setOnboardLightColor(request->red, request->green, request->blue);
}


#endif

#endif