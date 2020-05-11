import produce from 'immer';

export const initialState = {
  onModal: false,
  imageArray: [],
  isAdditingPost: false,
  isPostAdded: false,
  mainPosts: [],
  isLoadingPosts: false,
  isPostsLoaded: false,
};

export const SET_ON_MODAL = 'post/SET_ON_MODAL';
export const SET_OFF_MODAL = 'post/SET_OFF_MODAL';

export const UPLOAD_IMAGES_REQUEST = 'post/UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'post/UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'post/UPLOAD_IMAGES_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'post/LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'post/LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'post/LOAD_MAIN_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const LOAD_MY_POSTS_REQUEST = 'post/LOAD_MY_POSTS_REQUEST';
export const LOAD_MY_POSTS_SUCCESS = 'post/LOAD_MY_POSTS_SUCCESS';
export const LOAD_MY_POSTS_FAILURE = 'post/LOAD_MY_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_ON_MODAL: {
        draft.onModal = true;
        break;
      }
      case SET_OFF_MODAL: {
        draft.onModal = false;
        if (draft.isPostAdded) {
          draft.isPostAdded = false;
        }
        break;
      }
      // case UPLOAD_IMAGES_REQUEST: {
      //   break;
      // }
      // case UPLOAD_IMAGES_SUCCESS: {
      //   draft.imageArray = action.data;
      //   break;
      // }
      // case UPLOAD_IMAGES_FAILURE: {
      //   break;
      // }
      case LOAD_MAIN_POSTS_REQUEST: {
        draft.isLoadingPosts = true;
        draft.isPostsLoaded = false;
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        draft.mainPosts = action.data;
        draft.isLoadingPosts = false;
        draft.isPostsLoaded = true;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE: {
        draft.isLoadingPosts = false;
        draft.loadPostsErrorReason = action.error;
      }
      case ADD_POST_REQUEST: {
        draft.isAdditingPost = true;
        draft.isPostAdded = false;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.mainPosts.unshift(action.data);
        draft.isAdditingPost = false;
        draft.isPostAdded = true;
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAdditingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      case LOAD_MY_POSTS_REQUEST: {
        draft.isLoadingPosts = true;
        draft.isPostsLoaded = false;
        break;
      }
      case LOAD_MY_POSTS_SUCCESS: {
        draft.isLoadingPosts = false;
        draft.isPostsLoaded = true;
        break;
      }
      case LOAD_MY_POSTS_FAILURE: {
        draft.isLoadingPosts = false;
        draft.loadPostsErrorReason = action.error;
        break;
      }
      default:
        return {
          ...state,
        };
    }
  });
};

export default reducer;
