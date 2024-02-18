#include "qroma-boards.h"
#include "../lib_ver.h"


void populateGetBoardDetailsResponse(GetBoardDetailsResponse * response) {
  response->has_projectDetails = true;
  response->has_firmwareDetails = true;

  strncpy(response->projectDetails.projectName, QROMA_PROJECT_NAME, sizeof(response->projectDetails.projectName));

  strncpy(response->firmwareDetails.version, LIB_VER, sizeof(response->firmwareDetails.version));
  strncpy(response->firmwareDetails.buildTime, __DATE__ " " __TIME__, sizeof(response->firmwareDetails.buildTime));
  strncpy(response->firmwareDetails.boardName, getBoardName(), sizeof(response->firmwareDetails.boardName));
}