import produce from 'immer';

export const initialState = {
  me: null,
  isLoggedIn: false,
  isLoggingIn: false,
  logInErrorReason: '',
  isLoggingOut: false,
  isLoggedOut: false,
  logOutErrorReason: '',
  signedUp: false,
  isSigningUp: false,
  signUpErrorReason: '',
  userInfo: null,
  loadOtherUserInfoErrorReason: '',
  isFollowingAdding: false,
  isFollowingAdded: false,
  isFollowingDeleting: false,
  isFollowingDeleted: false,
  isFollowLoading: false,
  isFollowLoaded: false,
};

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const LOAD_USER_REQUEST = 'user/LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'user/LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'user/LOAD_USER_FAILURE';

export const LOAD_MY_POSTS = 'user/LOAD_MY_POSTS';

export const LOAD_OTHER_USER_INFO_REQUEST = 'user/LOAD_OTHER_USER_INFO_REQUEST';
export const LOAD_OTHER_USER_INFO_SUCCESS = 'user/LOAD_OTHER_USER_INFO_SUCCESS';
export const LOAD_OTHER_USER_INFO_FAILURE = 'user/LOAD_OTHER_USER_INFO_FAILURE';

export const ADD_FOLLOWING_REQUEST = 'user/ADD_FOLLOWING_REQUEST';
export const ADD_FOLLOWING_SUCCESS = 'user/ADD_FOLLOWING_SUCCESS';
export const ADD_FOLLOWING_FAILURE = 'user/ADD_FOLLOWING_FAILURE';

export const DELETE_FOLLOWING_REQUEST = 'user/DELETE_FOLLOWING_REQUEST';
export const DELETE_FOLLOWING_SUCCESS = 'user/DELETE_FOLLOWING_SUCCESS';
export const DELETE_FOLLOWING_FAILURE = 'user/DELETE_FOLLOWING_FAILURE';

export const LOAD_MY_FOLLOW_REQUEST = 'user/LOAD_MY_FOLLOW_REQUEST';
export const LOAD_MY_FOLLOW_SUCCESS = 'user/LOAD_MY_FOLLOW_SUCCESS';
export const LOAD_MY_FOLLOW_FAILURE = 'user/LOAD_MY_FOLLOW_FAILURE';

export const ADD_BOOKMARK_TO_ME = 'user/ADD_BOOKMARK_TO_ME';
export const LOAD_BOOKMARK_TO_ME = 'user/LOAD_BOOKMARK_TO_ME';
export const DELETE_BOOKMARK_TO_ME = 'user/DELETE_BOOKMARK_TO_ME';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.isLoggedIn = false;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.isLoggedIn = false;
        draft.logInErrorReason = action.error;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.signUpData = action.data;
        draft.isSigningUp = true;
        draft.signUpErrorReason = '';
        draft.signedUp = false;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signedUp = true;
        draft.isSigningUp = false;
        draft.isLoggedIn = true;
        draft.me = action.data;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignedUp = false;
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
      }
      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.isLoggedIn = true;
        draft.me = action.data;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.isLoggedOut = true;
        draft.isLoggedIn = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        draft.isLoggedOut = false;
        draft.logOutErrorReason = action.error;
        break;
      }
      case LOAD_MY_POSTS: {
        draft.me.Posts = action.data;
        break;
      }
      case LOAD_OTHER_USER_INFO_REQUEST: {
        draft.isOtherUserLoading = true;
        break;
      }
      case LOAD_OTHER_USER_INFO_SUCCESS: {
        draft.isOtherUserLoading = false;
        draft.otherUserLoaded = true;
        draft.userInfo = action.data;
        break;
      }
      case LOAD_OTHER_USER_INFO_FAILURE: {
        draft.isOtherUserLoading = false;
        draft.otherUserLoaded = false;
        draft.loadOtherUserInfoErrorReason = action.error;
        break;
      }
      case ADD_FOLLOWING_REQUEST: {
        draft.isFollowingAdding = true;
        draft.isFollowingAdded = false;
        break;
      }
      case ADD_FOLLOWING_SUCCESS: {
        draft.isFollowingAdding = false;
        draft.isFollowingAdded = true;
        if (draft.userInfo && draft.userInfo.id === action.data.id) {
          draft.userInfo.Followers.push(action.data);
        }
        draft.me.Followings.push(action.data);
        break;
      }
      case ADD_FOLLOWING_FAILURE: {
        draft.isFollowingAdding = false;
        draft.isFollowingAdded = false;
        draft.loadOtherUserInfoErrorReason = action.error;
        break;
      }
      case DELETE_FOLLOWING_REQUEST: {
        draft.isFollowingDeleting = true;
        draft.isFollowingDeleted = false;
        break;
      }
      case DELETE_FOLLOWING_SUCCESS: {
        draft.isFollowingDeleting = false;
        draft.isFollowingDeleted = true;
        const followerIndex = draft.me.Followings.findIndex(
          (v) => v.id === action.data.id,
        );
        if (draft.userInfo && draft.userInfo.id === action.data.id) {
          const followingIndex =
            draft.userInfo &&
            draft.userInfo.Followers &&
            draft.userInfo.Followers.findIndex((v) => v.id === draft.me.id);
          draft.userInfo.Followers.splice(followingIndex, 1);
        }
        draft.me.Followings.splice(followerIndex, 1);
        break;
      }
      case DELETE_FOLLOWING_FAILURE: {
        draft.isFollowingDeleting = false;
        draft.isFollowingDeleted = false;
        draft.loadOtherUserInfoErrorReason = action.error;
        break;
      }
      case LOAD_MY_FOLLOW_REQUEST: {
        draft.isFollowLoading = true;
        draft.isFollowLoaded = false;
        break;
      }
      case LOAD_MY_FOLLOW_SUCCESS: {
        draft.isFollowLoading = false;
        draft.isFollowLoaded = true;
        draft.me.Followings = action.data.followings;
        draft.me.Followers = action.data.followers;
        break;
      }
      case LOAD_MY_FOLLOW_FAILURE: {
        draft.isFollowLoading = false;
        draft.isFollowLoaded = false;
        draft.loadOtherUserInfoErrorReason = action.error;
        break;
      }
      case ADD_BOOKMARK_TO_ME: {
        if (draft.me && draft.me.BookmarkPosts) {
          draft.me.BookmarkPosts.push({ id: action.data.postId });
          break;
        }
      }
      case LOAD_BOOKMARK_TO_ME: {
        draft.me.BookmarkPosts = action.data;
        break;
      }
      case DELETE_BOOKMARK_TO_ME: {
        if (draft.me && draft.me.BookmarkPosts.length !== 0) {
          const bookmarkIndex = draft.me.BookmarkPosts.findIndex(
            (v, i) => v.id === action.data.postId,
          );
          draft.me.BookmarkPosts.splice(bookmarkIndex, 1);
        }
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
