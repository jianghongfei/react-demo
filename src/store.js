import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const saga = createSagaMiddleware();

export default createStore(reducers, applyMiddleware(saga));

saga.run(sagas);
