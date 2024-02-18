#ifdef QROMA_BOARD_DEF_ESP32_DEV

#ifndef QBD_ESP32_DEV
#define QBD_ESP32_DEV

#include "qroma-boards.h"


void onInit() { }

const char * getBoardName() {
  return "ESP 32 Dev Board Firmware";
}

void handleSetBoardLightColorRequest(SetBoardLightColorRequest * request, SetBoardLightColorResponse * response) {
  response->success = false;
  strncpy(response->message, "", sizeof(response->message));
  strncpy(response->message, "ESP 32 Dev Board doesn't support setting color", sizeof(response->message));
}


#endif

#endif