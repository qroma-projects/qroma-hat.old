#ifndef QROMA_PROJECT_H
#define QROMA_PROJECT_H

#include <Arduino.h>
#include "qroma-commands.h"


#define QROMA_BOARDS_UPDATE_CONFIG_FILENAME "/qroma-boards.config"

void qromaProjectSetup();

void qromaProjectLoop();

#endif