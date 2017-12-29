import { fork } from 'redux-saga/effects';

import global from './globalSagas';

export default function* () {
  yield [
    fork(global),
  ];
}
