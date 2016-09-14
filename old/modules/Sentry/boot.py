import json
import os
import binascii
import module
import paho.mqtt.client as mqtt
from socket import error as socket_error

CONFIG = 'config.json'
ADDRESS = '192.168.0.19'
ID_LEN = 24

def writeConfig(obj):
  with open(CONFIG, 'w') as config:
    json.dump(obj, config)

def readConfig():
  with open(CONFIG, 'r') as config:
    return json.load(config)

if os.path.isfile(CONFIG):
  data = readConfig()
  _id = str(data['_id'])
else:
  # Generate string of 24 hex characters as per mongodb spec.
  _id = binascii.b2a_hex(os.urandom(ID_LEN / 2))
  writeConfig({'_id': client._id})

def on_connect(client, userdata, flags, rc):
  client._id = _id
  payload = {
    'id': client._id,
    'title': module.title,
    'outgoing': module.outgoing,
    'incoming': module.incoming
  }
  client.publish('registration', json.dumps(payload))

  for topic in module.incoming:
    client.subscribe(topic+client._id);

  client.on_message = on_message

def on_message(client, userdata, packet):
  # Remove id from packet topic.
  packet.topic = packet.topic[0:len(packet.topic)-ID_LEN]
  module.on_message(client, userdata, packet)

def publish(topic, payload, retain):
  if topic in module.outgoing:
    client.publish(topic + client._id, payload, 0, retain)

client = mqtt.Client(_id)
client.on_connect = on_connect

while True:
  try:
    client.connect(ADDRESS, 1883, 60)
    break
  except socket_error as serr:
    print serr

client.loop_start()
module.start(publish)
