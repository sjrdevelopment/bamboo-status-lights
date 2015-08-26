# Bamboo status lights
#### Arduino node-powered status light polling Bamboo API

**Note:** You need credentials (preferrably supplied via a config file) to access the Bamboo API.

1. Install node https://nodejs.org/download/ if you don't already have it
2. NPM install the required modules (see top of last-build-status.js)
3. Upload `bamboo-light-neopixel` to Arduino (ATMega328 chip version with Serial over USB)
4. Run `node last-build-status`
5. Polling is set to once every minute, less than that is not recommended.