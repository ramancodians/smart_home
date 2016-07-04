
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
     while(!PubSubClient::connect(id)); 
     // need a timeout on this
     
     // also you may want to return false (triggering a reset) in the case that a broker connection cannot be made
     // as that "could" indicate a false brokerIp... this is what is happening for wifi details above

     /*
      * you also need to consider being more forgiving as well. like attempting connections several times
      * over several timeouts and keep a fail count or something so that all modules wont reset every 
      * time something happens like wifi cuts out or the broker is unreachable...
      */

     
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
