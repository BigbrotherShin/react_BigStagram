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
  ADD_POST_LIKE_SUCCESS,
  ADD_POST_LIKE_FAILURE,
  ADD_POST_LIKE_REQUEST,
  DELETE_POST_LIKE_SUCCESS,
  DELETE_POST_LIKE_FAILURE,
  DELETE_POST_LIKE_REQUEST,
  ADD_COMMENT_LIKE_SUCCESS,
  ADD_COMMENT_LIKE_FAILURE,
  ADD_COMMENT_LIKE_REQUEST,
  DELETE_COMMENT_LIKE_SUCCESS,
  DELETE_COMMENT_LIKE_FAILURE,
  DELETE_COMMENT_LIKE_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  LOAD_BOOKMARK_SUCCESS,
  LOAD_BOOKMARK_FAILURE,
  LOAD_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILURE,
  DELETE_BOOKMARK_REQUEST,
} from '../reducers/post';
import {
  LOAD_MY_POSTS,
  LOAD_BOOKMARK_TO_ME,
  DELETE_BOOKMARK_TO_ME,
  ADD_BOOKMARK_TO_ME,
} from '../reducers/user';

function loadPostsAPI(data) {
  return Axios.get(data && data.onlyImages ? '/posts/images' : '/posts', {
    withCredentials: false,
  });
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    console.log('loadPosts', result.data[0].Comments);
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

function addPostLikeAPI(actionData) {
  return Axios.post('/post/like', actionData, {
    withCredentials: true,
  });
}

function* addPostLike(action) {
  try {
    const result = yield call(addPostLikeAPI, action.data);
    yield put({
      type: ADD_POST_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_POST_LIKE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddPostLike() {
  yield takeEvery(ADD_POST_LIKE_REQUEST, addPostLike);
}

function deletePostLikeAPI(actionData) {
  return Axios.delete(`/post/like`, {
    data: actionData,
    withCredentials: true,
  });
}

function* deletePostLike(action) {
  try {
    const result = yield call(deletePostLikeAPI, action.data);
    yield put({
      type: DELETE_POST_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_POST_LIKE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchDeletePostLike() {
  yield takeEvery(DELETE_POST_LIKE_REQUEST, deletePostLike);
}

function addCommentLikeAPI(actionData) {
  return Axios.post('/post/comment/like', actionData, {
    withCredentials: true,
  });
}

function* addCommentLike(action) {
  try {
    const result = yield call(addCommentLikeAPI, action.data);
    yield put({
      type: ADD_COMMENT_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_LIKE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddCommentLike() {
  yield takeEvery(ADD_COMMENT_LIKE_REQUEST, addCommentLike);
}

function deleteCommentLikeAPI(actionData) {
  return Axios.delete(`/post/comment/like`, {
    data: actionData,
    withCredentials: true,
  });
}

function* deleteCommentLike(action) {
  try {
    const result = yield call(deleteCommentLikeAPI, action.data);
    yield put({
      type: DELETE_COMMENT_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_COMMENT_LIKE_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchDeleteCommentLike() {
  yield takeEvery(DELETE_COMMENT_LIKE_REQUEST, deleteCommentLike);
}

function addBookmarkAPI(actionData) {
  return Axios.post(`/post/bookmark`, actionData, {
    withCredentials: true,
  });
}

function* addBookmark(action) {
  try {
    const result = yield call(addBookmarkAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_BOOKMARK_TO_ME,
      data: result.data,
    });
    yield put({
      type: ADD_BOOKMARK_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_BOOKMARK_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchAddBookmark() {
  yield takeEvery(ADD_BOOKMARK_REQUEST, addBookmark);
}

function loadBookmarkAPI(actionData) {
  return Axios.get(`/post/bookmark`, {
    withCredentials: true,
  });
}

function* loadBookmark(action) {
  try {
    const result = yield call(loadBookmarkAPI, action.data);
    yield put({
      type: LOAD_BOOKMARK_TO_ME,
      data: result.data,
    });
    yield put({
      type: LOAD_BOOKMARK_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_BOOKMARK_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLoadBookmark() {
  yield takeEvery(LOAD_BOOKMARK_REQUEST, loadBookmark);
}

function deleteBookmarkAPI(actionData) {
  return Axios.delete(`/post/bookmark`, {
    data: actionData,
    withCredentials: true,
  });
}

function* deleteBookmark(action) {
  try {
    const result = yield call(deleteBookmarkAPI, action.data);
    yield put({
      type: DELETE_BOOKMARK_TO_ME,
      data: result.data,
    });
    yield put({
      type: DELETE_BOOKMARK_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_BOOKMARK_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchDeleteBookmark() {
  yield takeEvery(DELETE_BOOKMARK_REQUEST, deleteBookmark);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchLoadMyPosts),
    fork(watchAddComment),
    fork(watchAddPostLike),
    fork(watchDeletePostLike),
    fork(watchAddCommentLike),
    fork(watchDeleteCommentLike),
    fork(watchAddBookmark),
    fork(watchLoadBookmark),
    fork(watchDeleteBookmark),
  ]);
}
