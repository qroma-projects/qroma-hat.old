#ifndef QROMA_BOARD_H
#define QROMA_BOARD_H

#include <qroma-proto/my-project-messages.pb.h>

extern void onInit();
extern const char * getBoardName();

void populateGetBoardDetailsResponse(GetBoardDetailsResponse * config);
extern void handleSetBoardLightColorRequest(SetBoardLightColorRequest * request, SetBoardLightColorResponse * response);


#endif