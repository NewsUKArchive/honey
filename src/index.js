import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);