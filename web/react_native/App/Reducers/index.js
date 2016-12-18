import { combineReducers } from 'redux'
import EspConfigReducer from './EspConfigReducer'
import MqttReducer from './MqttReducer'

export default combineReducers({
  config: EspConfigReducer,
  mqtt: MqttReducer
})
