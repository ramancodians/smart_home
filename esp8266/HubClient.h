
#include <PubSubClient.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "Util.h"

#define MAX_CBS 10

typedef void (*fptr)(String);



class HubClient : public PubSubClient
{
public:
  HubClient(String hostname, String id, char* ssid, char* pass);
  ~HubClient();

  boolean connect();
  void publish(String topic, String payload);
  void registerSubscription(String topic, fptr func);

private:
  String id;
  char* ssid;
  char* pass;
  char* keys[MAX_CBS];
  fptr callbacks[MAX_CBS];
  byte cbsCount;
  byte getCbIndex(char* key);
};
