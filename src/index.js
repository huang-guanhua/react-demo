import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PageContainer from './page/index';
import storeData from './data/store';
import './test';

const store = createStore(storeData);

ReactDOM.render(
  <Provider store={store}>
    <PageContainer />
  </Provider>,
  document.getElementById('root'),
);
