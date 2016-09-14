
#include <ESP8266WiFi.h>
#include <HubClient.h>
#include <EEPROM.h>

#define REED_PIN 2

HubClient client(*(new WiFiClient()));

void setup() {
  pinMode(REED_PIN, INPUT_PULLUP);

  String incoming[] = {};
  String outgoing[] = {"door_state"};  
  client.setup("reed", incoming, 0, outgoing, 1);
  
  client.connect();
  client.publish("door_state", (digitalRead(REED_PIN) == 0) ? "closed" : "open");
  client.disconnect();

  ESP.deepSleep(0);
}

void loop() {
}

