# Smart Home

The goal of the smart home project is a cheap and simplistic solution for creating a system of interconnected smart devices. The project is split into 3 sections: Smart devices will do anything from monitor the quality of the air to automatically feed your pets while you are away. The hub facilitates communications between these devices and the outside world. Lastly the mobile application deals with device configuration and interfacing with the system.

## Install

### Hub

The hub is a nodejs app that consists primarily of an mqtt broker which facilitates communication throughout the system and so it needs to be running at all times. You will also need to install and setup mongodb for the app to work properly.

```
cd hub
npm install
node app.js
```

### Smart Devices

At the center of our smart devices is a wifi connected microcontroller (ESP8266), and we use arduino to program them, so you will need to install that and a few dependencies first:

- [Arduino ESP](https://github.com/esp8266/Arduino)
- [PubSubClient](https://github.com/Imroy/pubsubclient)
  Note: this library is a fork of another library that uses the same name so you need to change the name in "library.properties" to something unique to prevent arduino from updating the library because it will download the other library and replace the correct one.
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson)

Now connect your esp8266, open the .ino sketch under /esp8266/, select the appropriate port and board from the boards manager, and press the upload button.

### Mobile App

To use, download 'mobile' directory and [deploy](http://facebook.github.io/react-native/docs/getting-started.html) directly on your device. Note that the app only works with android at the moment as I have not properly configured the ios side yet.

```
cd mobile
npm install
npm run-script android
```

## Demonstration

[![](https://lh3.googleusercontent.com/gEL_TqJX9tBqb5BS2fkvxPUhQaOf1MMyuAa3IZksiv3IQq0LZhtgLkpW6BrTSOa6U3YotJJ2IUScmMESPIB46GaMHDHWB8HvIu3nP8YF4JFgDtS7j7ri8FHs4qHz150NoM7Ed6OVLltFlRHMWmLo4-QzBO1AvOZaFfY1-8YjZ0Hkmc7DtGncb_zvnvxMHyNbepFhqQkN8I7PeElKbbJ-ZoIYm8iKrXo2Ur9lrk0PJUpzrf64_6kSHQQUPPcIsnocBH8NaN8LqhhBc9lMxnepWFNWvKZswViRF80bVB6IsxVSTQqIVbsE3mDmjKYGt6gLKdIQ71LyKYvyipqcqGISHuZqmJ6WHeCIB095o5yUXy2cmHXyVPGQxFxAQh4SwJbugmhJbLQpiEN78UKiRAHRoJ4SQp19Y3wo1Ah6xg1SYdWguvEgKgeKzIgkQUVlUtfFgk4yzaap7_Ji57AVcj93r30sZJ-9QIx_5BXyxHh29owcPXEnP6UVbZCISy2oJajmH_nCyYXuNKpEJpp4vj0KnTUm1mILYK_zwrsfsq6NNZLHLwfuoFNnK0UJwBcbhIKKBMHaHY-4y2SDan91yF9rK66Sl_72mZTYnkIxsnwtHPTUpEXR=w1689-h950-no)](https://lh3.googleusercontent.com/5K3QNilPM0yt0NvgcuRqzfNcaSYvGOv0vwWLTPO-W-o0u-3LABVC8VFcqQR-L3e2wR7uG35koG_TE7NgXGodxi1ZO3wZ7o4NSZji7_WxiSN0f6uvyxfnth6T_KlXYLsDaAy-m3D1nIOYfT6kBap5NAtXCdAriecP1APZTSWEPrMdxAJjHWs4VMYzfOisNKxX4AEMNo6ClSKCs_9EUTX_9cgIkcF59ZT-KCQm6-x377kj0QOWX8VnSvM7Oei4Dj4xEz2s36RDfS_3RidWMcLUTkRYlEQofkIiFd2_EA7_WrfTRnQDCFCTaUppBgxaVQMKIgX0-sz60nRyxncogrD0uWKrGlyjgYxIxsZjz-H263aEh9JOWcq7fkcC8SHgPe30e7xKuklplkpKl8voSNTPDcfYt3fWSKma2DsT3QaTVniTw6sEWM05tw-tSbO4YPfgZAHewOmn8YLYvJx0yRPS9y51bl3ON3BLM7Yc0lcsQCUsSiXqMSGLJ6rWfkiPQsZWgwIrTws2EEVhhzalXz34V8w6Dg2bnYGurxIcLQOgOAgkDzknhJ8rSVOh48Z47gZ74sMmgGKh0EuG3RMmi3JDtcG3o1QRW1LrRY3AD6jOZtkGcvYJ=m37?cpn=zcialM8tkGDQ7A09&c=WEB&cver=1.20160922)
