import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from '../Lib/Redux'

export const INITIAL_STATE = Immutable({
  attempting: null
})

const submit = (state, action) =>
  state.merge({
    attempting: true
  })

const response = (state, action) =>
  state.merge({
    attempting: false
  })

const ACTION_HANDLERS = {
  [Types.CONFIG_SUBMIT]: submit,
  [Types.CONFIG_RESPONSE]: response
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
