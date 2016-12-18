import { createStore, applyMiddleware, compose } from 'redux'
import { AsyncStorage } from 'react-native'
import createLogger from 'redux-logger'
import rootReducer from '../Reducers/'
import Config from '../Config/DebugSettings'
import createSagaMiddleware from 'redux-saga'
import sagas from '../Sagas/'
import R from 'ramda'

const USE_LOGGING = Config.reduxLogging
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
})

let middleware = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

if (__DEV__) {
  middleware.push(logger)
}

export default () => {
  let store = {}
  const enhancers = compose(
    applyMiddleware(...middleware),
  )

  store = createStore(
    rootReducer,
    enhancers
  )
  sagaMiddleware.run(sagas, store.dispatch);
  return store;
}
