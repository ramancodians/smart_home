import {take, call, put, select} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
var DeviceInfo = require('react-native-device-info');

function promisifyConnect(client) {
  return new Promise(function(resolve, reject){
    client.connect({
      onSuccess: resolve,
      onFailure: (err) => {
        reject("mqtt failed to connect @ " + err.errorMessage);
      }
    });
  });
}

function promisifySubscribe(client, topic) {
  return new Promise(function(resolve, reject){
    client.subscribe(topic, {
      onSuccess: resolve,
      onFailure: (err) => {
        reject("mqtt failed to subscribe @ " + err.errorCode);
      }
    });
  });
}

function * publish(topic, payload){
  let client = yield select((state) => state.mqtt.client);
  if(client && client.isConnected()) {
    let message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    yield call(client.send, message);
  }
}

function * subscribe(topic) {
  let client = yield select((state) => state.mqtt.client);
  if(client && client.isConnected()) {
    yield promisifySubscribe(client, topic).catch(function(err){
      console.log(err);
    });
  }
}

function * connect(ip, dispatch) {
  var client = new Paho.MQTT.Client(ip, 8080, "mobile @ " + DeviceInfo.getUniqueID());

  client.onConnectionLost = () => {
    console.log('lost connection');
  };

  client.onMessageArrived = (message) => {
    dispatch(Actions.recievedMqttMessage(message.payloadString));
  };


  yield promisifyConnect(client).catch(function(err){
    console.log(err);
  });

  if(client.isConnected()) {
    yield put(Actions.mqttConnected(client));
  }
  else {
    //yield put something else...
  }
}

function * connectWatcher(dispatch) {
  while (true) {
    const { ip } = yield take(Types.MQTT_CONNECT);
    yield call(connect, ip, dispatch);
  }
}

// this may cause race conditions with the other two watchers...
// it should be used temporarily and can be removed entirely in the future...
function * connectAndPublishWatcher(dispatch) {
  while(true) {
    const {ip, topic, payload} = yield take(Types.MQTT_CONNECT_AND_PUBLISH);
    yield call(connect, ip, dispatch);
    yield call(publish, topic, payload);
  }
}

function * publishWatcher(dispatch) {
  while(true) {
    const { topic, payload } = yield take(Types.MQTT_SEND_MESSAGE);
    yield call(publish, topic, payload);
  }
}

function * subscribeWatcher(dispatch) {
  while(true) {
    const { topic } = yield take(Types.MQTT_SUBSCRIBE);
    yield call(subscribe, topic);
  }
}

export default watchers = [
  connectWatcher,
  connectAndPublishWatcher,
  publishWatcher,
  subscribeWatcher
];
