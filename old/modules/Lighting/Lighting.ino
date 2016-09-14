
#include <ESP8266WiFi.h>
#include <HubClient.h>
#include <EEPROM.h>

#define LED_PIN 2
#define BUFFER_SIZE 100

HubClient client(*(new WiFiClient()));

void callback(const MQTT::Publish& pub) {
  if (pub.has_stream()) {
    uint8_t buf[BUFFER_SIZE];
    int read;
    while (read = pub.payload_stream()->read(buf, BUFFER_SIZE)) {
    }
    pub.payload_stream()->stop();
  } 
  else {    
    if(pub.payload_string().equals("on"))
      digitalWrite(LED_PIN, HIGH);
    else
      digitalWrite(LED_PIN, LOW);
  }
}

void setup() {
  pinMode(LED_PIN, OUTPUT); 
  pinMode(LED_PIN, HIGH);

  String incoming[] = {"modify"};
  String outgoing[] = {};
  client.set_callback(callback);
  client.setup("lighting", incoming, 1, outgoing, 0);
}


void loop() {
  client.connect();
}

