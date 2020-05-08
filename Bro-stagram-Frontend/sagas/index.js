import { all, fork } from 'redux-saga/effects';
import Axios from 'axios';
import { backurl } from '../config/config';
import user from './user';
import post from './post';

Axios.defaults.baseURL = `${backurl}/api`;

export default function* rootSaga() {
  yield all([fork(user), fork(post)]);
}
