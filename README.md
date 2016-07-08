# Smart Home

This project was conceived as my honors project, and the goal of the project is to make it easier for people to create a network of modules which communicate with each other through an mqtt broker. Modules, in this case, are essentially anything that performs some task within the house, which can be anything from monitoring the quality of the air to automatically feeding your pets while you are away. The complexity will vary quite a bit between modules, some will just send data and others will do more interesting things (automation, robotics, etc).

I am of the opinion that most modules should not and do not need to be "internet enabled" (meaning that the user can interface directly with the device from outside of the local network). The idea of a "smart home" is that the home should be smart enough to handle itself without too much help from the outside world, it should be its own enclosed entity. Obviously there are exceptions, but if the added convenience is not enough to justify adding a new attack vector then it is unnecessary risk.

For communication between modules, the protocol needed to be lightweight to be fast and energy efficient on such low power devices. Fortunately there is a protocol that is suited to such a scenario, which is mqtt (formerly mq telemetry transport).

# Why DIY?

There are commercial products for many "smart devices" that you would potentially want, but there are a few issues that are quite apparent. There is no inter connectivity between products, for each "smart device" you buy there is usually single way to interface with it, so you will most likely need to have a different application for every new device, and the quality of these application is questionable to say the least. Another issue is the price, which is usually quite high, especially if you are considering several devices. Lastly security and reliability are incredibly important in these kinds of devices and while dealing with these things yourself can be quite difficult, commercial products do not have the best track record in that area as of late (ex. [revolv](http://uk.businessinsider.com/googles-nest-closing-smart-home-company-revolv-bricking-devices-2016-4), [nest](http://www.cbc.ca/news/technology/nest-smart-home-problems-1.3410143), [foscam](http://thenewstack.io/snooping-webcam-reveals-security-dangers-internet-things/)).

# Hardware

There are two pieces of hardware that I believe should cover most (if not all) conceivable devices within a smart home (microcontroller vs microprocessor). The first being the esp8266 (microcontroller), which provides several (varies by model) I/O pins that are used to interface with devices, as well as a built in wifi chip. Generally, if you are dealing with things that you control, like sensors, motors, or servos, a micro controller is a good option. The second is the raspberry pi (microprocessor) which is a step up from the esp8266 as it is a single board computer (usually running linux), with ports for USB, HDMI, audio, and has a fair bit of processing power (varies by model). The raspberry pi has weaker and/or flakier I/O capabilities but is great for when you are doing anything that requires heavy processing, such as mathematics.

# Security

Unfortunately for the esp8266, physical access is problematic because the device provides no eeprom reading protection. With access to the eeprom the attacker has access to any authentication details that are used and with that the entire system is exposed. Various methods could be employed to obscure the credentials on the esp8266, such as encryption. Unfortunately it will always be possible to reverse engineer any method(s) that are used since the module itself needs to operate entirely on its own.

# Hub

The hub is concerned with essentially everything outside of the modules. It has an mqtt broker ([aedes](https://github.com/mcollina/aedes)), can emit notifications ([twilio](https://github.com/twilio/twilio-node/) / [gmailer](https://github.com/nodemailer/nodemailer)), and facilitates all other "smart" details pertaining to the project. The hub is a node application and must be running at all times. Any device should work fine but something low power like a raspberry pi would be a good fit. The two main prerequisites needed on the host device are mongodb and nodejs.

# Mobile App (ESP8266)
The esp8266 is a relatively simplistic device, where users are usually doing some operations on any number of the available pins. So I wanted to create a method for setting up new esp8266 based devices where users wouldn't need to write new simple programs for each device conceived. Also uploading code to the esp8266 can be a bit of a pain and so moving that responsibility to a mobile application allows the user to change the functionality of the esp8266 without ever having to actually upload any code or even touch the device itself.

ESP8266 Initialization (HTTP)
- Flash arduino program to esp8266
- Connect to new access point
- Start mobile application and select initialize
- Enter ssid and password of home network
- Enter ip of the device running the broker
- Enter title and location of the device
- Press submit

The id of the esp8266 is a combination of the title and location as that should be unique. The location is separated into two parts, the zone (general) and spec (specific), (ex. door/garage/left/[topic_name]).

After these steps the esp8266 should connect to the broker and will periodically publish a message. The module is currently (and will always be) subscribed to two default topics, configuration and reset (ex. door/garage/left/reset). The rest of the configuration happens via the configuration subscription through the following steps.

ESP8266 Configuration (MQTT)
- Connect to home access point
- Start mobile application and select configure
- ...

# Mobile App (as a module)

The mobile app primarily acts as a more user friendly interface to the network, as the alternative would be to grab an available mqtt client application and use that, which is still a possible option mind you (ex. [mqtt.fx](http://mqttfx.jfx4ee.org/) / [mymqtt](https://play.google.com/store/apps/details?id=at.tripwire.mqtt.client&hl=en)). Another function of the app is to determine who is within the house, or at least which mobile devices are currently connected to the broker.

# RPI

The rpi is much more complicated as it is running an OS (most likely linux) so a simple configuration solution (as with the esp8266) is not feasible.
