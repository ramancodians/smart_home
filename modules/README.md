
# Smart Devices (Modules)
At the center of our smart devices is a wifi connected microcontroller (ESP8266), and we use arduino to program them, so you will need to install that and a few dependencies first:

- [Arduino ESP](https://github.com/esp8266/Arduino)
- [PubSubClient](https://github.com/Imroy/pubsubclient)
  Note: this library is a fork of another library that uses the same name so you need to change the name in "library.properties" to something unique to prevent arduino from updating the library because it will download the other library and replace the correct one.
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson)

Now connect your esp8266, open the .ino sketch under /esp8266/, select the appropriate port and board from the boards manager, and press the upload button.
