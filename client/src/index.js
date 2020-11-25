//data layer control (redux)
import 'materialize-css/dist/css/materialize.min.css';
//pour le design : library component : material UI
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//relier react et redux
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//dev only axios helpers
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  //provider, update components with new state
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
