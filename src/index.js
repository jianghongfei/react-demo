import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './index.css';
import App from './routes/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';

/* eslint-disable */
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, root);

registerServiceWorker();
