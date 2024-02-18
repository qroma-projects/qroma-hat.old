#include <Esp.h>
#include <fs.h>
#include "qroma-commands.h"
#include "qroma/qroma.h"
#include "boards/qroma-boards.h"
#include "qroma-project.h"


FwUpdateConfiguration updateConfiguration = FwUpdateConfiguration_init_zero; 

const char * HELLO_QROMA_RESPONSE_PREFIX = "Hello from Qroma, ";
int helloQromaCallCount = 0;


void onSetUpdateConfiguration(SetUpdateConfiguration * message, SetUpdateConfigurationResponse * response) {
  if (!message->has_updateConfiguration) {
    logError("NO UPDATE CONFIG");
    response->success = false;
  }

  if (message->updateConfiguration.updateType == UpdateType_UpdateType_Interval ||
      message->updateConfiguration.updateType == UpdateType_UpdateType_ProgressIndicator)
  {
    if (message->updateConfiguration.updateIntervalInMs < 10 || message->updateConfiguration.updateIntervalInMs > 60000) {
      logError("UPDATE CONFIG ERR - INVALID INTERVAL PARAMETERS");
      response->success = false;
      return;
    }
  }

  updateConfiguration.updateType = message->updateConfiguration.updateType;
  updateConfiguration.updateIntervalInMs = message->updateConfiguration.updateIntervalInMs;

  if (message->saveConfiguration) {
    bool saved = savePbToPersistence(&updateConfiguration, QROMA_BOARDS_UPDATE_CONFIG_FILENAME, FwUpdateConfiguration_fields);
    if (!saved) {
      logError("ERROR SAVING UPDATE CONFIG");
    }
    response->success = saved;

  } else {
    response->success = true;
  }  
}


void onLoadBoardConfiguration(LoadBoardConfigurationResponse * response) {
  bool loaded = loadPbFromPersistence<FwUpdateConfiguration>(
    &updateConfiguration, QROMA_BOARDS_UPDATE_CONFIG_FILENAME, FwUpdateConfiguration_fields);

  response->has_loadedConfiguration = true;

  response->loadedConfiguration.updateIntervalInMs = updateConfiguration.updateIntervalInMs;
  response->loadedConfiguration.updateType = updateConfiguration.updateType;
}


void onHelloQromaRequest(HelloQromaRequest * request, HelloQromaResponse * response) {
  helloQromaCallCount++;

  strncpy(response->response, HELLO_QROMA_RESPONSE_PREFIX, sizeof(response->response));
  strncat(response->response, request->name, sizeof(response->response) - strlen(HELLO_QROMA_RESPONSE_PREFIX));
  response->callCount = helloQromaCallCount;
  response->nameLength = strnlen(request->name, size_t(response->response));
}


void onMathRequest(MathRequest * request, MathResponse * response) {
  switch (request->op) {
    case MathOperation_MathOp_Add:
      response->which_response = MathResponse_addResult_tag;
      response->response.addResult.result = request->a + request->b;
      break;

    case MathOperation_MathOp_Subtract:
      response->which_response = MathResponse_subtractResult_tag;
      response->response.subtractResult.result = request->a - request->b;
      break;

    case MathOperation_MathOp_Add_And_Subtract:
      response->which_response = MathResponse_addAndSubtractResult_tag;
      response->response.addAndSubtractResult.addResult = request->a + request->b;
      response->response.addAndSubtractResult.subtractResult = request->a - request->b;
      break;

    case MathOperation_MathOp_NotSet:
    default:
      logError("Bad message: MathOp_NotSet");
  }
}


void handleNoArgCommand(NoArgCommands noArgCommand, MyProjectResponse * response) {
  switch (noArgCommand) {
    case NoArgCommands_Nac_NotSet:
      logError("NoArgCommand not set");
      break;

    case NoArgCommands_Nac_GetBoardDetailsRequest:
      response->which_response = MyProjectResponse_getBoardDetailsResponse_tag;
      populateGetBoardDetailsResponse(&(response->response.getBoardDetailsResponse));
      break;
    
    case NoArgCommands_Nac_LoadBoardConfiguration:
      response->which_response = MyProjectResponse_loadBoardConfigurationResponse_tag;
      onLoadBoardConfiguration(&(response->response.loadBoardConfigurationResponse));
      logError("Not implemented: LoadBoardConfiguration command");
      break;
    
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
  logInfo("ME APP!");
  logInfo(message->which_command);
  logInfo("<<>>");

  // set this so that handler implementations are flagged if they forget to set
  // the response as part of their logic
  response->which_response = MyProjectResponse_invalidCommandResponse_tag;

  switch (message->which_command) {
    case MyProjectCommand_noArgCommand_tag:
      handleNoArgCommand(message->command.noArgCommand, response);
      break;

    case MyProjectCommand_helloQromaRequest_tag:
      response->which_response = MyProjectResponse_helloQromaResponse_tag;
      onHelloQromaRequest(&(message->command.helloQromaRequest), &(response->response.helloQromaResponse));
      break;

    case MyProjectCommand_mathRequest_tag:
      response->which_response = MyProjectResponse_mathResponse_tag;
      onMathRequest(&(message->command.mathRequest), &(response->response.mathResponse));
      break;

    case MyProjectCommand_setUpdateConfiguration_tag:
      response->which_response = MyProjectResponse_setUpdateConfigurationResponse_tag;
      response->response.setUpdateConfigurationResponse = SetUpdateConfigurationResponse_init_zero;
      onSetUpdateConfiguration(&(message->command.setUpdateConfiguration),
        &(response->response.setUpdateConfigurationResponse));
      break;

    case MyProjectCommand_pingRequest_tag:
      response->which_response = MyProjectResponse_pingResponse_tag;
      response->response.pingResponse = PingResponse_init_zero;
      response->response.pingResponse.pingId = message->command.pingRequest.pingId;
      response->response.pingResponse.uptime = millis();
      break;

    case MyProjectCommand_getBoardDetailsRequest_tag:
      response->which_response = MyProjectResponse_getBoardDetailsResponse_tag;
      populateGetBoardDetailsResponse(&(response->response.getBoardDetailsResponse));
      break;

    case MyProjectCommand_setBoardLightColorRequest_tag:
      response->which_response = MyProjectResponse_setBoardLightColorResponse_tag;
      handleSetBoardLightColorRequest(&(message->command.setBoardLightColorRequest), 
        (&(response->response.setBoardLightColorResponse)));
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