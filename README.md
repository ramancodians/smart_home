# Smart Home

This project was conceived as an honors project, and the goal of the project is to provide a method for creating a cheap network of modules which can communicate with each other and users to provide a valuable service. Modules, in this case, are essentially anything that performs some task within the house, which can be anything from monitoring the quality of the air to automatically feeding your pets while you are away.

I am of the opinion that most modules and interactions should not and do not need to be "internet enabled" (meaning that the user can interface directly with the device from outside of the local network). I believe that a "smart home" should be smart enough to handle itself without too much help from the outside world, essentially acting as an enclosed entity. Obviously there are exceptions, but if the added convenience is not enough to justify adding a new vector for attack then it is an unnecessary risk.

# Why DIY?

There are commercial products for most "smart devices" that you would potentially want, but there are a few issues that are quite apparent. There is usually no inter connectivity between products, for each device you purchase there is usually single way to interface with it, so you will most likely need to have a different application for every new device. Another issue is the price, which is usually quite high, especially if you are considering several devices possibly including some kind of subscription service. The last issue is security, which is incredibly important in these kinds of devices and while dealing with security yourself can be tricky, commercial products certainly do not have the best track record in this area as of late (ex. [revolv](http://uk.businessinsider.com/googles-nest-closing-smart-home-company-revolv-bricking-devices-2016-4), [nest](http://www.cbc.ca/news/technology/nest-smart-home-problems-1.3410143), [foscam](http://thenewstack.io/snooping-webcam-reveals-security-dangers-internet-things/)).


# Hub

The hub is concerned with essentially everything outside of the modules. It runs an mqtt broker ([aedes](https://github.com/mcollina/aedes)) which facilitates communication between users and modules, it emits notifications ([twilio](https://github.com/twilio/twilio-node/) / [gmailer](https://github.com/nodemailer/nodemailer)), and deals all other intermediary functionality pertaining to the project. The hub is a node.js application and will need to be running at all times.

# Modules (ESP8266)

The brain of our modules will be the esp8266, which is an extremely cheap microcontroller that provides several (varies by model) I/O pins which are used to interface with devices, as well as a built in wifi chip. Generally, if you are dealing with things that you control, like sensors, motors, or servos, a micro controller is a good option.

The esp8266 is a relatively simplistic device, where users are usually doing some operations on any number of the available pins. So I wanted to create a method for setting up new esp8266 based devices where users wouldn't need to write any new code for each device conceived. Also uploading code to the esp8266 can be a bit of a pain and so moving that responsibility to the mobile application allows the user to change the functionality of the esp8266 without ever having to actually upload any code. Also being able to configure the device without removing it from its physical installation is an added bonus. The setup is split into two steps, one for getting the device connected to the broker through credentials (configuration) and another for getting details as to what the user needs the device to actually do (initialization).


# Dependencies

There are a few dependencies needed to get this project up and running.

arduino + esp8266 boards manager...

+ ArduinoJson

For arduino you need to install the pubsubclient library ([PubSubClient](https://github.com/Imroy/pubsubclient)). This library is a fork of another library that uses the same name so you can change the name in "library.properties" to something unique to prevent arduino from attempting to update the library because it will download a different library that is incompatible.

The two main prerequisites needed on the hub's host device are mongodb and nodejs.

# Setup

Initial
- Run hub node application on persistent device

ESP8266 Configuration (HTTP)
- Flash arduino program to esp8266
- Connect to new access point
- Open mobile application and select configure
- Enter ssid and password of home network
- Enter ip of the device running the broker
- Enter title of device (ex. door, weather, light)
- Enter location of device (ex. zone: front_yard, spec: left_gate)
- Press submit

The title and location for the device will form its unique id as well as each topic name that the device publishes to (ie. reed/front_yard/left_gate/[topic_name]). After these steps the esp8266 should reset and then connect to your hub and will send a single intro message. I would advise downloading an external mqtt client application for testing purposes (ex. [mqtt.fx](http://mqttfx.jfx4ee.org/)). After verifying that everything is working properly, continue with the steps below to initialize the functionality of the device.

ESP8266 Initialization (MQTT)
- Connect to home access point
- Start mobile application and select configure
- ...

# Mobile

Mqtt client is still TODO.

# Desktop

TODO
