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

[![](https://lh3.googleusercontent.com/jzsPQypSwPUnDgO8AI_cLfutUu4JEBVtcKeGKjWXFq0VAtW6BA9hRiw0oq8tF-cRGV-EzSmAeErbt9EIoz7L-prGPyvls2lUTTCxhaDlAP7wFa07d__Lfz4tD_XEd9_9EiEpQOgoCKZNJYbbFOrX61VvTfflIIuGPxQkOKW1CPX_akVPnM9W8Jl1e_ogGJUMu5SwXDBCKBp9Z6c9innZFEIYhPz4EnViUYdAs30n1YywAdKPGYmAC69X2ZtTrfKZG3wz0kUUIoaKNJGKj6NPHQt6WWh9VMbHa_P_XsFa1X91ZH9mDAT7kMXfGZ6S1ImMvNTD9ZoYr61jVU0J8Bp9rhcS2UCvf43ZWZUIWZgcAXVPvqsZKDku7zd0pbQcdY-SAoTwHQueoj7TtwzLrmbLTr1nw9EfhWovJAnimpEcqBPSRcBYkqO4NcpNJ5J4BOmy_UjbsLWT1AOpJOkIcG_CWD7MJPq5yBtrihgFkbBzdMago1gB-1WTD5TYsPEN7bt2wBJnaNmgIfAfCoQGh7uLtO4SP1TAnHMdR3J2yYXEtuFbrP_se0FOsQKRT4hsMy82F_9tBKqSR4OgfifdNvjTnvSgMyzgd7EYj-ouMH_Ep-2N527O=w1698-h955-no)](https://lh3.googleusercontent.com/UsOPsul3xqcW7FKAd0_MCLEcA59WKYkiCzXLiWRzZWjVZmp76gnl4iTBORsTtyidMy-N_XrvJLvAzKDaKAqGuakUIpb2Gmbp1lGDQ-xUouUK2hIald6aG2pHoTfLz_btmHUKbIV0gXZFSSKth3SNkyIFk_8zpTwWVQk2sFtBE46KRBYz2ac969XrLuNtMvBsGXLaYROvGqPAX26obVYRGqqtGvrzVU9MCyWTycSSijj2eyPuRCNiP0BlW-4jdDA0PjD57uD-KpRgMeKS4SR9xkZ3ZmrqmGKHSIQ7kKHQvzmliS0cwt9Nfsz0jZdMOm2yOlndKgDuz4NVTZ5u6wYvXeJSVlQqZaQbUa9caZVYPLwdCuTz7pQ4sNVzDQvfbjPLJqs-X5HokwX2fjMgZAmmd_nrUXDXbGCdx0cfZHyVKN65FvQe0vz2A6o5Ba95SsgGtOQQdsF6kX7GEq87q24F030QggRC0WGXeoOkUMZKIpVYUmRqEQPnJ_gDXStrNH68rk7FiEShEhR5J2J-yp_7o-XoSKSzYvzta5bgMrUC6BwlYdLLC4PWGAR3wP-zPkzyiyIX2EoXq4JHYAcfxrhuvY20kEYjyBlIjMPajTrBSSG2PkAy=m37?cpn=McH1Poy1yo16JY2f&c=WEB&cver=1.20160915)

[![](https://lh3.googleusercontent.com/jzsPQypSwPUnDgO8AI_cLfutUu4JEBVtcKeGKjWXFq0VAtW6BA9hRiw0oq8tF-cRGV-EzSmAeErbt9EIoz7L-prGPyvls2lUTTCxhaDlAP7wFa07d__Lfz4tD_XEd9_9EiEpQOgoCKZNJYbbFOrX61VvTfflIIuGPxQkOKW1CPX_akVPnM9W8Jl1e_ogGJUMu5SwXDBCKBp9Z6c9innZFEIYhPz4EnViUYdAs30n1YywAdKPGYmAC69X2ZtTrfKZG3wz0kUUIoaKNJGKj6NPHQt6WWh9VMbHa_P_XsFa1X91ZH9mDAT7kMXfGZ6S1ImMvNTD9ZoYr61jVU0J8Bp9rhcS2UCvf43ZWZUIWZgcAXVPvqsZKDku7zd0pbQcdY-SAoTwHQueoj7TtwzLrmbLTr1nw9EfhWovJAnimpEcqBPSRcBYkqO4NcpNJ5J4BOmy_UjbsLWT1AOpJOkIcG_CWD7MJPq5yBtrihgFkbBzdMago1gB-1WTD5TYsPEN7bt2wBJnaNmgIfAfCoQGh7uLtO4SP1TAnHMdR3J2yYXEtuFbrP_se0FOsQKRT4hsMy82F_9tBKqSR4OgfifdNvjTnvSgMyzgd7EYj-ouMH_Ep-2N527O=w1698-h955-no)](https://lh3.googleusercontent.com/5K3QNilPM0yt0NvgcuRqzfNcaSYvGOv0vwWLTPO-W-o0u-3LABVC8VFcqQR-L3e2wR7uG35koG_TE7NgXGodxi1ZO3wZ7o4NSZji7_WxiSN0f6uvyxfnth6T_KlXYLsDaAy-m3D1nIOYfT6kBap5NAtXCdAriecP1APZTSWEPrMdxAJjHWs4VMYzfOisNKxX4AEMNo6ClSKCs_9EUTX_9cgIkcF59ZT-KCQm6-x377kj0QOWX8VnSvM7Oei4Dj4xEz2s36RDfS_3RidWMcLUTkRYlEQofkIiFd2_EA7_WrfTRnQDCFCTaUppBgxaVQMKIgX0-sz60nRyxncogrD0uWKrGlyjgYxIxsZjz-H263aEh9JOWcq7fkcC8SHgPe30e7xKuklplkpKl8voSNTPDcfYt3fWSKma2DsT3QaTVniTw6sEWM05tw-tSbO4YPfgZAHewOmn8YLYvJx0yRPS9y51bl3ON3BLM7Yc0lcsQCUsSiXqMSGLJ6rWfkiPQsZWgwIrTws2EEVhhzalXz34V8w6Dg2bnYGurxIcLQOgOAgkDzknhJ8rSVOh48Z47gZ74sMmgGKh0EuG3RMmi3JDtcG3o1QRW1LrRY3AD6jOZtkGcvYJ=m37?cpn=zcialM8tkGDQ7A09&c=WEB&cver=1.20160922)
