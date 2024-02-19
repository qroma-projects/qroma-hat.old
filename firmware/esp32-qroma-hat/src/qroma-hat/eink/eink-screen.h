#ifndef EINK_SCREEN_H_INCLUDED
#define EINK_SCREEN_H_INCLUDED

#include <Arduino.h>
#include "epd_driver.h"
#include "esp_adc_cal.h"


const uint16_t EINK_WIDTH  = 960;
const uint16_t EINK_HEIGHT = 540;

uint8_t * initActiveImageBuffer();

void clearScreenToWhite();
void clearScreenToBlack();


#endif