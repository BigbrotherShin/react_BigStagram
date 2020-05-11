import { fork, takeEvery, put, call, all } from 'redux-saga/effects';
import Axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_OTHER_USER_INFO_SUCCESS,
  LOAD_OTHER_USER_INFO_FAILURE,
  LOAD_OTHER_USER_INFO_REQUEST,
} from '../reducers/user';

function signUpAPI(SignUpData) {
  return Axios.post('/user', SignUpData);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.dir(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function loginAPI(loginData) {
  return Axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function loadUserAPI(userId) {
  return Axios.get('/user', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function logoutAPI() {
  return Axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function otherUserInfoAPI(action) {
  console.log(action);
  return Axios.get(`/user/${action}`, {
    withCredentials: false,
  });
}

function* otherUserInfo(action) {
  try {
    const result = yield call(otherUserInfoAPI, action.data);
    yield put({
      type: LOAD_OTHER_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_OTHER_USER_INFO_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchOtherUserInfo() {
  yield takeEvery(LOAD_OTHER_USER_INFO_REQUEST, otherUserInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchLogout),
    fork(watchOtherUserInfo),
  ]);
}
