# Smart Home

# Broker
The service should work with any broker, I personally used mosquitto. Since your broker will need to be always on I advise using a low power device, such as a [raspberry pi](http://www.switchdoc.com/2016/02/tutorial-installing-and-testing-mosquitto-mqtt-on-raspberry-pi/).

# Setup
The esp8266 is a relatively simplistic device, where users are usually doing some operations on any number of the available pins. So I wanted to create a method for setting up new esp8266 based devices where users wouldn't need to write new simplistic programs for each device conceived. Also uploading code to the esp8266 can be a bit of a pain and so moving that responsibility to a mobile application allows the user to change the functionality of the esp8266 without ever having to actually upload any code or even touch the device itself.

ESP8266 Initialization (HTTP)
- Flash arduino program to esp8266
- Connect to new access point
- Start mobile application and select initialize
- Enter ssid and password of home network
- Enter ip of the device running the broker
- Enter title and location of the device
- Press submit

The id of the esp8266 is a combination of the title and location as that should be unique. The location is separated into two parts, the zone (general) and spec (specific), (ex. door/garage/left/[topic_name]).

After these steps the esp8266 should connect to the broker and will periodically publish a welcoming message. The module is currently (and will always be) subscribed to two default topics, configuration and reset (ex. door/garage/left/reset). The rest of the configuration happens via the configuration subscription through the following steps.

ESP8266 Configuration (MQTT)
- Connect to home network
- Start mobile application and select configure
- ...
