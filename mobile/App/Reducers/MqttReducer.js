import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from '../Lib/Redux'

export const INITIAL_STATE = Immutable({
  client: null,
  messages: null 
})

const connect = (state, action) =>
  state.merge({
    client: null,
    messages: []
  })

const connected = (state, action) =>
  state.merge({
    client: action.client
  })

const recieve = (state, action) =>
  state.merge({
    messages: [...state.messages, action.message]
  })

const ACTION_HANDLERS = {
    [Types.MQTT_CONNECT]: connect,
    [Types.MQTT_CONNECTED]: connected,
    [Types.MQTT_MESSAGE_RECIEVED]: recieve
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
