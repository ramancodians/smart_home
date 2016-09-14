
#include <ESP8266WiFi.h>
#include <HubClient.h>
#include <EEPROM.h>
#include <Servo.h>

#define SERVO_PIN 2
#define SOIL_PIN 4
#define SERVO_OPEN 700
#define SERVO_CLOSED 2300
#define BUFFER_SIZE 100
#define PUBLISH_INTERVAL 10000

HubClient client(*(new WiFiClient()));
Servo servo;
unsigned long prevTime = 0;
unsigned long wateringTime = 0;
unsigned long wateringInterval = 0;

void callback(const MQTT::Publish& pub) {
  if (pub.has_stream()) {
    uint8_t buf[BUFFER_SIZE];
    int read;
    while (read = pub.payload_stream()->read(buf, BUFFER_SIZE)) {
    }
    pub.payload_stream()->stop();
  } 
  else {    
    wateringTime = millis();
    wateringInterval = pub.payload_string().toInt();
    servo.writeMicroseconds(SERVO_OPEN);
  }
}

void setup() {
  servo.attach(SERVO_PIN);
  servo.writeMicroseconds(SERVO_CLOSED);
  pinMode(SOIL_PIN, INPUT);

  String incoming[] = {"water"};
  String outgoing[] = {"light", "soil"};
  client.set_callback(callback);
  client.setup("hydroponics", incoming, 1, outgoing, 2);
}


void loop() {
  client.connect();

  unsigned long currTime = millis();
  if(currTime - prevTime > PUBLISH_INTERVAL) {
    client.publish("light", String(analogRead(A0)));
    client.publish("soil", String(digitalRead(SOIL_PIN)));
    prevTime = currTime;  
  }
  if(currTime - wateringTime > wateringInterval)
    servo.writeMicroseconds(SERVO_CLOSED);
}

