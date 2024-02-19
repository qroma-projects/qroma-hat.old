#include "eink-screen.h"
#include "logo.h"
#include <qroma/qroma.h>


uint8_t * initActiveImageBuffer() {
  uint32_t bufferSize = (EINK_WIDTH * EINK_HEIGHT) / 2;
  uint8_t * buffer = (uint8_t*) calloc(bufferSize, sizeof(uint8_t)); // allocate memory, save address
  return buffer;
} 

void clearScreenToWhite() {
  logInfo("clearScreenToWhite()");
  
  epd_poweron();
  epd_clear();
  // epd_draw_grayscale_image(area, (uint8_t *)activeImage.imageData);
  // epd_draw_image(area, (uint8_t *)activeImage.imageData, BLACK_ON_WHITE);
  
  delay(500);
  
  epd_poweroff();
}


void clearScreenToBlack() {
  logInfo("clearScreenToBlack()");
  
  epd_poweron();

   Rect_t area = {
    .x = 230,
    .y = 20,
    .width = logo_width,
    .height = logo_height,
  };

  epd_draw_image(area, (uint8_t *)logo_data, BLACK_ON_WHITE);

  // epd_clear();
  // epd_draw_grayscale_image(area, (uint8_t *)activeImage.imageData);
  // epd_draw_image(area, (uint8_t *)activeImage.imageData, BLACK_ON_WHITE);
  
  delay(500);
  
  epd_poweroff();
}
