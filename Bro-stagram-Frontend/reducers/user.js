import produce from 'immer';

export const initialState = {
  me: null,
  isLoggedIn: false,
  isLoggingIn: false,
  logInErrorReason: '',
  isLoggingOut: false,
  logOutErrorReason: '',
  signedUp: false,
  isSigningUp: false,
  signUpErrorReason: '',
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
      default:
        return {
          ...state,
        };
    }
  });
};

export default reducer;
