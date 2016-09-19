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

The mobile app is a react native application so you can download the app [here](https://play.google.com/store/apps/details?id=com.smarthome.mobile) or download this repo and [deploy](http://facebook.github.io/react-native/docs/getting-started.html) directly on your device. Note that the app only works with android at the moment as I have not properly configured the ios side yet.

```
cd mobile
npm install
npm run-script android
```

## Demonstration

[![](https://lh3.googleusercontent.com/jzsPQypSwPUnDgO8AI_cLfutUu4JEBVtcKeGKjWXFq0VAtW6BA9hRiw0oq8tF-cRGV-EzSmAeErbt9EIoz7L-prGPyvls2lUTTCxhaDlAP7wFa07d__Lfz4tD_XEd9_9EiEpQOgoCKZNJYbbFOrX61VvTfflIIuGPxQkOKW1CPX_akVPnM9W8Jl1e_ogGJUMu5SwXDBCKBp9Z6c9innZFEIYhPz4EnViUYdAs30n1YywAdKPGYmAC69X2ZtTrfKZG3wz0kUUIoaKNJGKj6NPHQt6WWh9VMbHa_P_XsFa1X91ZH9mDAT7kMXfGZ6S1ImMvNTD9ZoYr61jVU0J8Bp9rhcS2UCvf43ZWZUIWZgcAXVPvqsZKDku7zd0pbQcdY-SAoTwHQueoj7TtwzLrmbLTr1nw9EfhWovJAnimpEcqBPSRcBYkqO4NcpNJ5J4BOmy_UjbsLWT1AOpJOkIcG_CWD7MJPq5yBtrihgFkbBzdMago1gB-1WTD5TYsPEN7bt2wBJnaNmgIfAfCoQGh7uLtO4SP1TAnHMdR3J2yYXEtuFbrP_se0FOsQKRT4hsMy82F_9tBKqSR4OgfifdNvjTnvSgMyzgd7EYj-ouMH_Ep-2N527O=w1698-h955-no)](https://lh3.googleusercontent.com/6A7TomgIyNkArL3moMr8gcDwpzxHY1TZSYeAe6ZFWEqtlO1fe5AJBbKFNq_XrvVsGZ4piegzY8_Kxffk5Rf0145iXhajjIWK-sCMh9Pzj50saLu3oxuVRXQSYVAoKS7vtXcACbojK1AxrrQMDpPFFPXfs2iN0lGscDJXeWfKApBhp9uQSGRswaajFVjWfm5yecVI09n0OfPSv5nIM1SDjrdOmLzDsjPuS4A0vOH_ZIywQ7Gl-GtLU8QVHSC1TCmyX6OTf6TZXI1n-yLgZLgrQyH7SA1pHcDbnGnGRnTVO0tmS6EbV8lAPom4pk-5eXJr7HDNTbPeAQWUbCAX_LpX_8GoduXL0jjuhL2Bdnes08-Pv7WA4HSLuJsvDp-g6CQ0DoeFDmELH_D6bvUeVI6jJjHh3P2YIGMBR5TPeqObHTzRmUaYgSLlD8WPhFhntHjEuWbjwqa8H-a-hHfK1t1FTgeLnVbpmcF0czYSpfeY2b4cmN5nNg2smxo5BQa217zMe2kzogQ0Pk-eCtuC91rtJVfRSetnG9Mxg6ul6m8Bdom6ktRK_1AyZctUmKaq-igOfd7fMzLx5H0MGppPfyXM1B3asNxzPKkRK-g5dUe87g9VxNQE=m37?cpn=40ThuAYl28DAiIv4&c=WEB&cver=1.20160915)
