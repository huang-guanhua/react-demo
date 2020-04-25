import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import PageContainer from './page/index';
import storeData from './data/store';
import api from './api/index';
import './test';

const store = createStore(
    storeData,
    applyMiddleware(thunk, api, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <PageContainer />
  </Provider>,
  document.getElementById('root'),
);
