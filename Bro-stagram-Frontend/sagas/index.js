import { all, fork } from 'redux-saga/effects';
import Axios from 'axios';
import { backurl } from '../config/config';
import user from './user';

Axios.defaults.baseURL = `${backurl}/api`;

export default function* rootSaga() {
  yield all([fork(user)]);
}
