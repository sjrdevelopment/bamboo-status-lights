#include <Adafruit_NeoPixel.h>

// Neopixels constants
#define PIN 6
int numPixels = 12;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(numPixels, PIN, NEO_GRB + NEO_KHZ800);

uint32_t colRed = strip.Color(255,0,0);
uint32_t colGreen = strip.Color(0,255,0);




int incomingByte = 0;   // for incoming serial data

int toWrite = 0;
int prevWrite = 0;

String rawData = "no data";


void setup() {
  Serial.begin(9600);


  // Neopixels init
  strip.begin();

  strip.setBrightness(100);

  strip.show(); // Initialize all pixels to 'off'

  red();

}

void loop() {

  if (Serial.available() > 0) {

      toWrite = Serial.parseInt();

      if(toWrite != prevWrite) {
        prevWrite = toWrite;

        // 1 is pass, 2 is fail (for better conversion to int that 0)

        if(toWrite == 1) {
          green();

        } else if (toWrite == 2) {
           red();
        }

        delay(100);

      }

      delay(100);
  }

  delay(100);

}

void green() {
  for(int t = 0; t < numPixels; t++) {
    strip.setPixelColor(t, colGreen);
     strip.show();
  }
}

void red() {
  for(int u = 0; u < numPixels; u++) {
    strip.setPixelColor(u, colRed);
     strip.show();
  }
}
