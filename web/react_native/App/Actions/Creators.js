import Types from './Types'
const submitConfig = (config) => ({type: Types.CONFIG_SUBMIT, config});
const recieveConfigResponse = (res) => ({type: Types.CONFIG_RESPONSE, res});
const mqttConnect = (ip) => ({type: Types.MQTT_CONNECT, ip});
const mqttConnectAndPublish = (ip, topic, payload) => ({type: Types.MQTT_CONNECT_AND_PUBLISH, ip, topic, payload});
const mqttConnected = (client) => ({type: Types.MQTT_CONNECTED, client});
const recievedMqttMessage = (message) => ({type: Types.MQTT_MESSAGE_RECIEVED, message});
const mqttSubscribe = (topic) => ({type: Types.MQTT_SUBSCRIBE, topic});
const mqttSendMessage = (topic, payload) => ({type: Types.MQTT_SEND_MESSAGE, topic, payload});

export default {
  submitConfig,
  recieveConfigResponse,
  mqttConnect,
  mqttConnectAndPublish,
  mqttConnected,
  recievedMqttMessage,
  mqttSubscribe,
  mqttSendMessage
}
