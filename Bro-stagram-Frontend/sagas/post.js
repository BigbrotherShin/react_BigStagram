import { fork, takeEvery, put, call, all } from 'redux-saga/effects';
import Axios from 'axios';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MY_POSTS_FAILURE,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_POSTS_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
} from '../reducers/post';
import { LOAD_MY_POSTS } from '../reducers/user';

function loadPostsAPI(post) {
  return Axios.get('/posts', {
    withCredentials: false,
  });
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function addPostAPI(post) {
  return Axios.post('/post', post, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    result.data.Comments = new Array();
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

function loadMyPostsAPI() {
  return Axios.get('/posts/myPosts', {
    withCredentials: true,
  });
}

function* loadMyPosts(action) {
  try {
    const result = yield call(loadMyPostsAPI);

    yield put({
      type: LOAD_MY_POSTS_SUCCESS,
    });
    yield put({
      type: LOAD_MY_POSTS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MY_POSTS_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadMyPosts() {
  yield takeEvery(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function addCommentAPI(comment) {
  return Axios.post('/post/comment', comment, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    if (!result.data.RecommentId) {
      result.data.Recomments = new Array();
    }
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchLoadMyPosts),
    fork(watchAddComment),
  ]);
}
