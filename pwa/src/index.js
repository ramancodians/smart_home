import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import App from './containers/app';

import './index.css';

let middleware = [];

const enhancers = compose(
  applyMiddleware(...middleware)
);

let store = createStore(
  rootReducer,
  enhancers
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);