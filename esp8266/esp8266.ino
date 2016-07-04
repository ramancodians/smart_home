#include <ESP8266WiFi.h>
#include <EEPROM.h>
#include "HubClient.h"
#include "Util.h"

char SERVER_PSK[] = "sparkfun";
byte ASCII_START = 48;

/*
//pin types
enum {
  DIGITAL = 0,
  ANALOG,
  //special cases
  DS18B20,

  TYPES_SIZE
};

//pin
enum {
  NUM = 0,
  TYPE,
  MODE,
  
  PINS_SIZE
};
int pinCount;
*/

//config
enum {
  VERIF = 0,
  BROKER_IP,
  AP_SSID,
  AP_PASS,
  TITLE,
  ZONE,
  SPEC,
  SLEEP,
  //PINS, 

  CONFIG_SIZE
};

String values[CONFIG_SIZE];
WiFiServer *server;
HubClient *client;
boolean appMode;
boolean resetable;

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

//byte getPinVal(int i, int v) {
//  return values[PINS][i*PINS_SIZE + v] - ASCII_START;
//}

void setupHubClient() {
  String id = "";
  id += values[TITLE];
  id += "/";
  id += values[ZONE];
  id += "/";
  id += values[SPEC];

  // setup pin modes
  //pinCount = values[PINS].length() / PINS_SIZE;
  //for(int i = 0; i < pinCount; i++)
  //  pinMode(getPinVal(i, NUM), getPinVal(i, MODE));

  WiFi.mode(WIFI_STA);
  client = new HubClient(values[BROKER_IP], id, Util::stringToString(values[AP_SSID]), Util::stringToString(values[AP_PASS]));
  client->registerSubscription("reset", &reset);
  client->registerSubscription("registration", &registration);

  int sleep = values[SLEEP].toInt();
  if(sleep < 0) {
    // subscribe to some more stuff...
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
  ESP.reset();
}

void registration(String payload) {
  
}

void serverLoop() {  
  WiFiClient client = server->available();
  if(resetable) {
    delay(1000);
    ESP.reset();
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
    parseDelimitedString(req, values, CONFIG_SIZE, 1, '&');
    values[VERIF] = "1"; // swapping to module mode
    values[SLEEP] = "-1";
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

void hubClientLoop() {
  if(!client->connect()) 
    reset("");
  client->publish("testing", "this is a test!");

  delay(1000);
}

void parseDelimitedString(String s, String *out, int len, int start, char delim) {
  for(int i = start; i < len; i++) {
    int end = s.indexOf(delim);
    out[i] = s.substring(0, end);
    s = s.substring(end + 1);
  }
}

void writeEEPROM() {
  int accum = 0;
  for(int i = 0; i < CONFIG_SIZE; i++) {
    byte entrySize = values[i].length();
    EEPROM.write(accum, entrySize);
    accum++;
    byte j = 0;
    for(; j < entrySize; j++) {
      EEPROM.write(accum + j, values[i][j]);
    }
    accum += (j + 1);
  }
  EEPROM.commit();
}

void readEEPROM() {
  int accum = 0;
  for(int i = 0; i < CONFIG_SIZE; i++) {
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

