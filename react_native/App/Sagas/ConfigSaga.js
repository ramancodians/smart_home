import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

function * sendConfig(config) {
    let url = 'http://192.168.4.1/?';

    for(let i = 0; i < config.length; i++)
      url += config[i] + '&';
    try {
      const response = yield call(fetch, url, {
        timeout: 10000, // not currently working, it is much longer...
        method: 'GET'
      });

      if(response.ok) {
        yield put(Actions.recieveConfigResponse('Good!'))
      }
      else {
        yield put(Actions.recieveConfigResponse('Bad!'))
      }
    }
    catch (err) {
      yield put(Actions.recieveConfigResponse('Bad!'));
    }
  }

  export default function * watcher () {
    while (true) {
      const { config } = yield take(Types.CONFIG_SUBMIT);
      yield call(sendConfig, config);
    }
  }
