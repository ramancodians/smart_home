
#include <ESP8266WiFi.h>
#include <HubClient.h>
#include <EEPROM.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define DS18B20_PIN 2
#define SLEEP_INTERVAL_SECS 300

HubClient client(*(new WiFiClient()));
OneWire oneWire(DS18B20_PIN);
DallasTemperature DS18B20(&oneWire);

void setup() {
  String incoming[] = {};
  String outgoing[] = {"temp"};  
  client.setup("weather_station", incoming, 0, outgoing, 1);

  float outsideTemp;
  do {
    DS18B20.requestTemperatures(); 
    outsideTemp = DS18B20.getTempCByIndex(0);
  } while (outsideTemp == 85.0 || outsideTemp == (-127.0));
  
  client.connect();
  client.publish("temp", String(outsideTemp));
  client.disconnect();
  
  ESP.deepSleep(SLEEP_INTERVAL_SECS * 1000000, WAKE_RF_DEFAULT);
}

void loop() {
}

