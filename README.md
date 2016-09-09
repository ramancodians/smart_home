# Smart Home

The goal of the smart home project is a cheap and simplistic solution for creating a system of interconnected smart devices. The project is split into 3 sections, smart devices which can do anything from monitor the quality of the air to automatically feed your pets while you are away, the hub facilitates communications between these devices and the outside world, and the mobile application deals with device configuration and interfacing with the system.

## Installation / Setup

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

The mobile app is a react native application so you can download the app [here](https://play.google.com/store/apps/details?id=com.smarthome.mobile) or download this repo and [deploy](http://facebook.github.io/react-native/docs/getting-started.html) directly on your device. Note that the app only works with android at the moment as I have not properly configured the ios side yet.

```
cd mobile
npm install
npm run-script android
```

## Demonstration

[![](https://lh3.googleusercontent.com/jzsPQypSwPUnDgO8AI_cLfutUu4JEBVtcKeGKjWXFq0VAtW6BA9hRiw0oq8tF-cRGV-EzSmAeErbt9EIoz7L-prGPyvls2lUTTCxhaDlAP7wFa07d__Lfz4tD_XEd9_9EiEpQOgoCKZNJYbbFOrX61VvTfflIIuGPxQkOKW1CPX_akVPnM9W8Jl1e_ogGJUMu5SwXDBCKBp9Z6c9innZFEIYhPz4EnViUYdAs30n1YywAdKPGYmAC69X2ZtTrfKZG3wz0kUUIoaKNJGKj6NPHQt6WWh9VMbHa_P_XsFa1X91ZH9mDAT7kMXfGZ6S1ImMvNTD9ZoYr61jVU0J8Bp9rhcS2UCvf43ZWZUIWZgcAXVPvqsZKDku7zd0pbQcdY-SAoTwHQueoj7TtwzLrmbLTr1nw9EfhWovJAnimpEcqBPSRcBYkqO4NcpNJ5J4BOmy_UjbsLWT1AOpJOkIcG_CWD7MJPq5yBtrihgFkbBzdMago1gB-1WTD5TYsPEN7bt2wBJnaNmgIfAfCoQGh7uLtO4SP1TAnHMdR3J2yYXEtuFbrP_se0FOsQKRT4hsMy82F_9tBKqSR4OgfifdNvjTnvSgMyzgd7EYj-ouMH_Ep-2N527O=w1698-h955-no)](https://youtu.be/rsrqRjhaspY)
