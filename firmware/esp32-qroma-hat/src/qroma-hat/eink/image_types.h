
#ifndef IMAGE_TYPES_H_INCLUDED
#define IMAGE_TYPES_H_INCLUDED

#include <stdint.h>


typedef struct _HatGsBmpImageDef { 
  const uint32_t imageWidth;
  const uint32_t imageHeight;
  const uint8_t * imageData;
  const char * imageLabel;
} HatGsBmpImageDef;


typedef struct _HatImageData { 
  uint32_t imageWidth;
  uint32_t imageHeight;
  uint8_t * imageData;
  const char * imageLabel;
} HatImageData;


typedef struct _HatDgsrImageMetadataDef {
  const char * imageLabel;          // Label string describing image
} HatDgsrImageMetadataDef;


typedef struct _HatDgsrImageDef {
  const char magic[4];            // magic bytes "dgsr"
  const uint32_t imageWidth;           // image width in pixels (BE)
  const uint32_t imageHeight;          // image height in pixels (BE)
  const uint8_t gsBitsPerPixel;   // Max number of bits per pixel (1-6, so up to 64 GS values are possible)

  const uint32_t dgsrDataByteCount;

  const HatDgsrImageMetadataDef metadata;

  const uint8_t * dgrsData;
} HatDgsrImageDef;


enum HatImageEncoding {
  HIE_UNKNOWN = 0,
  HIE_GS_BMP  = 1,
  HIE_DGSR    = 2,
};


union HatImagePointer {
  HatGsBmpImageDef * gsBmpImage;
  HatDgsrImageDef * dgsrImage;
};


typedef struct _HatImageDef {
  HatImageEncoding hatImageEncoding;
  HatImagePointer hatImagePointer;
} HatImageDef;


#endif
