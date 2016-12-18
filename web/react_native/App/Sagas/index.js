import { fork } from 'redux-saga/effects'
import configWatcher from './ConfigSaga';
import mqttWatchers from './MqttSaga';

export default function * root(dispatch) {
  yield fork(configWatcher);
  for(let entry in mqttWatchers)
    yield fork(mqttWatchers[entry], dispatch);
}
