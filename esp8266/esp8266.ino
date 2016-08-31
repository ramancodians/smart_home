#include <ESP8266WiFi.h>
#include <EEPROM.h>
#include "HubClient.h"
#include "Util.h"
#include <ArduinoJson.h>

const char SERVER_PSK[] = "";
const byte ASCII_START = 48;
const byte GPIO[] = {16, 14, 12, 13, 5, 4, 0, 2, 15};

// eeprom details
enum {
  // config
  BROKER_IP = 0,
  AP_SSID,
  AP_PASS,
  TITLE,
  ZONE,
  SPEC,
  CONFIG_SIZE,

  // registration
  SLEEP,
  PINS,

  // other
  VERIF,
  EEPROM_SIZE
};

String values[EEPROM_SIZE];
WiFiServer *server;
HubClient *client;
boolean appMode;
boolean resetable;
byte flip = LOW;

void setup() 
{
  EEPROM.begin(512);
  readEEPROM();

  appMode = (values[VERIF][0] == 0);
  if(appMode)
    setupServer();
  else
    setupHubClient();
}

void setupServer() {
  server = new WiFiServer(80);

  WiFi.mode(WIFI_AP);
  
  uint8_t mac[WL_MAC_ADDR_LENGTH];
  WiFi.softAPmacAddress(mac);
  String macID = String(mac[WL_MAC_ADDR_LENGTH - 2], HEX) +
                 String(mac[WL_MAC_ADDR_LENGTH - 1], HEX);
  macID.toUpperCase();
  String AP_NameString = "ESP8266 " + macID;
  
  char AP_NameChar[AP_NameString.length() + 1];
  memset(AP_NameChar, 0, AP_NameString.length() + 1);
  
  for (int i=0; i<AP_NameString.length(); i++)
    AP_NameChar[i] = AP_NameString.charAt(i);

  WiFi.softAP(AP_NameChar, SERVER_PSK);

  server->begin();
}

void setupHubClient() {
  String id = "";
  id += values[TITLE];
  id += "/";
  id += values[ZONE];
  id += "/";
  id += values[SPEC];

  // setup pin modes
  for(int i = 0; i < values[PINS].length(); i++) {
    byte mode = values[PINS][i]- ASCII_START;
    if(mode >= 0 && mode <= 2)
      pinMode(GPIO[i], mode);
  }

  WiFi.mode(WIFI_STA);
  client = new HubClient(values[BROKER_IP], id, Util::stringToString(values[AP_SSID]), Util::stringToString(values[AP_PASS]));
  client->registerSubscription("reset", &reset);
  client->registerSubscription("registration", &registration);

  int sleep = values[SLEEP].toInt();
  if(sleep == -1) {
  } 
  else {
    hubClientLoop();
    client->disconnect();
    ESP.deepSleep(sleep * 1000000);
  }
}

void loop() 
{
  if(appMode)
    serverLoop();
  else 
    hubClientLoop();
}

void reset(String payload) {
  char c = '0' - ASCII_START;
  values[VERIF] = String(c);
  writeEEPROM();
  ESP.restart();
}

void registration(String payload) {
  StaticJsonBuffer<512> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(payload);
  if (!root.success())
    return;
  resetRegistrationValues();

  String pins = root["pins"];
  values[PINS] = pins;
  String sleep = root["sleep"];
  values[SLEEP] = sleep;
  
  writeEEPROM();
  ESP.restart();
}

void serverLoop() {  
  WiFiClient client = server->available();
  if(resetable) {
    delay(1000);
    //ESP.reset();
    ESP.restart();
  }
  if (!client)
    return;

  while(!client.available())
    delay(1);

  String req = client.readStringUntil('\r');
  client.flush();
  
  String s = "HTTP/1.1 200 OK\r\n";
  s += "Content-Type: text/html\r\n\r\n";
  s += "<!DOCTYPE HTML><html>";

  int queryIndex = req.indexOf("?");
  if(queryIndex != -1) {
    req = req.substring(queryIndex + 1, req.length() - 9); 
    parseDelimitedString(req, values, CONFIG_SIZE, '&');
    values[VERIF] = "1"; // swapping to module mode
    resetRegistrationValues();
    writeEEPROM();
    s += "<p>EEPROM Updated...</p>";
  }
  s += "<p>Reseting Module...</p>";
  s += "</html>\n";

  // Send the response to the client
  client.print(s);
  delay(1);
  resetable = true;
}

void resetRegistrationValues() {
  values[SLEEP] = "-1";
  values[PINS] = "";
  // fill in more defaults...
}

void hubClientLoop() {
  if(!client->connect()) 
    reset("");

  // for testing purposes
  client->publish("pulse", "I am alive!");
  
  //perform default task based on pin mode
  for(int i = 0; i < values[PINS].length(); i++) {
    byte pin = GPIO[i];
    byte mode = values[PINS][i] - ASCII_START;

    switch(mode) {
      case INPUT:
      case INPUT_PULLUP:
        client->publish("GPIO_" + String(pin), String(digitalRead(pin)));
      case OUTPUT:
        flip = (flip == LOW) ? HIGH : LOW;
        digitalWrite(pin, flip);
        break;
    }
  }
  delay(500);
}

void parseDelimitedString(String s, String *out, int len, char delim) {
  for(int i = 0; i < len; i++) {
    int end = s.indexOf(delim);
    out[i] = s.substring(0, end);
    s = s.substring(end + 1);
  }
}

/*
 * EEPROM is a sequence of bytes.
 * Each entry in the eeprom is a sequence of characters (bytes).
 * Each entry takes one extra byte to store the size of the entry.
 */
void writeEEPROM() {
  int accum = 0;
  for(int i = 0; i < EEPROM_SIZE; i++) {
    byte entrySize = values[i].length();
    EEPROM.write(accum, entrySize);
    accum++;
    byte j = 0;
    for(; j < entrySize; j++)
      EEPROM.write(accum + j, values[i][j]);
    accum += (j + 1);
  }
  EEPROM.commit();
}
void readEEPROM() {
  int accum = 0;
  for(int i = 0; i < EEPROM_SIZE; i++) {
    byte entrySize = EEPROM.read(accum);
    accum++;
    byte j = 0;
    char entry[entrySize];
    for(; j < entrySize; j++)
      sprintf(entry + j, "%c", EEPROM.read(j + accum));
    accum += (j + 1);
    String result = entry;
    result.trim();
    values[i] = result;
  }
}

