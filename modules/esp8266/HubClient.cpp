
#include "HubClient.h"

HubClient::HubClient(String hostname, String id, char* ssid, char* pass) :
  PubSubClient(*(new WiFiClient()), hostname), id(id), ssid(ssid), pass(pass) {
    auto cb = [this] (const MQTT::Publish& pub) {
      byte index = getCbIndex(Util::stringToString(pub.topic()));
      callbacks[index](pub.payload_string());
    };
    PubSubClient::set_callback(cb);
}

HubClient::~HubClient() {
}

byte HubClient::getCbIndex(char* key) {
  for(byte i = 0; i < cbsCount; i++)
    if(strcmp(key, keys[i]) == 0)
      return i;
  return -1;
}

boolean HubClient::connect() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid, pass);
    if (WiFi.waitForConnectResult() != WL_CONNECTED)
      return false;
  }
  if(!PubSubClient::connected()) {
     // wait to connect to broker.
     while(!PubSubClient::connect(id)) {
      if(attemptCount > 10)
        return false;
      attemptCount++; 
     }
     // need timeout here instead of attempt count
     
  
     // renew subscriptions
     for(byte i = 0; i < cbsCount; i++)
       PubSubClient::subscribe(keys[i]);
  }
  else
    PubSubClient::loop();
  return true;
}

void HubClient::publish(String topic, String payload) {
  PubSubClient::publish(id + "/" + topic, payload);
}

void HubClient::registerSubscription(String topic, fptr func) {
  topic = id + "/" + topic;
  keys[cbsCount] = Util::stringToString(topic);
  callbacks[cbsCount] = func;
  cbsCount++;
}
