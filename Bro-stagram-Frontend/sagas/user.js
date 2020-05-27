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
  ADD_FOLLOWING_SUCCESS,
  ADD_FOLLOWING_FAILURE,
  ADD_FOLLOWING_REQUEST,
  DELETE_FOLLOWING_SUCCESS,
  DELETE_FOLLOWING_FAILURE,
  DELETE_FOLLOWING_REQUEST,
  LOAD_MY_FOLLOW_SUCCESS,
  LOAD_MY_FOLLOW_FAILURE,
  LOAD_MY_FOLLOW_REQUEST,
  ADD_PROFILE_IMAGE_SUCCESS,
  ADD_PROFILE_IMAGE_FAILURE,
  ADD_PROFILE_IMAGE_REQUEST,
} from '../reducers/user';

function signUpAPI(SignUpData) {
  return Axios.post('/user', SignUpData, {
    withCredentials: true,
  });
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
  return Axios.get(`/user/${encodeURIComponent(action)}`, {
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

function addFollowingAPI(actionData) {
  return Axios.post(`/user/following`, actionData, {
    withCredentials: true,
  });
}

function* addFollowing(action) {
  try {
    const result = yield call(addFollowingAPI, action.data);
    yield put({
      type: ADD_FOLLOWING_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_FOLLOWING_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddFollowing() {
  yield takeEvery(ADD_FOLLOWING_REQUEST, addFollowing);
}

function deleteFollowingAPI(actionData) {
  return Axios.delete(`/user/following`, {
    data: actionData,
    withCredentials: true,
  });
}

function* deleteFollowing(action) {
  try {
    const result = yield call(deleteFollowingAPI, action.data);
    yield put({
      type: DELETE_FOLLOWING_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_FOLLOWING_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchDeleteFollowing() {
  yield takeEvery(DELETE_FOLLOWING_REQUEST, deleteFollowing);
}

function loadMyFollowAPI(actionData) {
  return Axios.get(`/user/me/follow`, {
    withCredentials: true,
  });
}

function* loadMyFollow(action) {
  try {
    const result = yield call(loadMyFollowAPI, action.data);
    yield put({
      type: LOAD_MY_FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MY_FOLLOW_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadMyFollow() {
  yield takeEvery(LOAD_MY_FOLLOW_REQUEST, loadMyFollow);
}

function addProfileImageAPI(actionData) {
  return Axios.patch(`/user/profileImage`, actionData, {
    withCredentials: true,
  });
}

function* addProfileImage(action) {
  try {
    const result = yield call(addProfileImageAPI, action.data);
    yield put({
      type: ADD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_PROFILE_IMAGE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddProfileImage() {
  yield takeEvery(ADD_PROFILE_IMAGE_REQUEST, addProfileImage);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLoadUser),
    fork(watchLogout),
    fork(watchOtherUserInfo),
    fork(watchAddFollowing),
    fork(watchDeleteFollowing),
    fork(watchLoadMyFollow),
    fork(watchAddProfileImage),
  ]);
}
