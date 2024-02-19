#include <Esp.h>
#include <fs.h>
#include "qroma-commands.h"
#include "qroma/qroma.h"
#include "qroma-project.h"
#include "eink/eink-screen.h"


UpdateConfiguration updateConfiguration = UpdateConfiguration_init_zero; 


void handleNoArgCommand(NoArgCommands noArgCommand, MyProjectResponse * response) {
  switch (noArgCommand) {
    case NoArgCommands_Nac_NotSet:
      logError("NoArgCommand not set");
      break;

    case NoArgCommands_Nac_ClearScreenToWhite:
      clearScreenToWhite();
      break;

    case NoArgCommands_Nac_ClearScreenToBlack:
      clearScreenToBlack();
      break;

    // case NoArgCommands_Nac_GetHatDetails:
    //   response->which_response = MyProjectResponse_getBoardDetailsResponse_tag;
    //   populateGetBoardDetailsResponse(&(response->response.getBoardDetailsResponse));
    //   break;
    
    case NoArgCommands_Nac_RestartDevice:
      // no response to be forthcoming
      ESP.restart();
      break;
    
    default:
      logError("Unrecognized NoArgCommand command");
      logError(noArgCommand);
      break;
  }
}


void onMyProjectCommand(MyProjectCommand * message, MyProjectResponse * response) {
  // logInfo("ON MY PROJECT COMMAND");
  // logInfo(message->which_command);
  // logInfo("<<>>");

  // set this so that handler implementations are flagged if they forget to set
  // the response as part of their logic
  response->which_response = MyProjectResponse_invalidCommandResponse_tag;

  switch (message->which_command) {
    case MyProjectCommand_noArgCommand_tag:
      handleNoArgCommand(message->command.noArgCommand, response);
      break;

    default:
      logError("Unrecognized MyProjectCommand command");
      logError(message->which_command);
      break;
  }

  if (response->which_response == MyProjectResponse_invalidCommandResponse_tag) {
    strncpy(response->response.invalidCommandResponse.message,
      "Unrecognized or unhandled project command",
      sizeof(response->response.invalidCommandResponse.message));
  }
}