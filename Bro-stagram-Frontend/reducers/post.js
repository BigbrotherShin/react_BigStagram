import produce from 'immer';

export const initialState = {
  onModal: false,
  imageArray: [],
  isAdditingPost: false,
  isPostAdded: false,
  mainPosts: [],
  isLoadingPosts: false,
  isLoadingImages: false,
  isPostsLoaded: false,
  isAddingComment: false,
  isCommentAdded: false,
  addCommentErrorReason: '',
  mentionedUser: '',
  recommentId: '',
  commentPostId: '',
  isAddingLike: false,
  isLikeAdded: false,
  isDeletingLike: false,
  isLikeDeleted: false,
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

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

export const ADD_POST_LIKE_REQUEST = 'post/ADD_POST_LIKE_REQUEST';
export const ADD_POST_LIKE_SUCCESS = 'post/ADD_POST_LIKE_SUCCESS';
export const ADD_POST_LIKE_FAILURE = 'post/ADD_POST_LIKE_FAILURE';

export const DELETE_POST_LIKE_REQUEST = 'post/DELETE_POST_LIKE_REQUEST';
export const DELETE_POST_LIKE_SUCCESS = 'post/DELETE_POST_LIKE_SUCCESS';
export const DELETE_POST_LIKE_FAILURE = 'post/DELETE_POST_LIKE_FAILURE';

export const ADD_COMMENT_LIKE_REQUEST = 'post/ADD_COMMENT_LIKE_REQUEST';
export const ADD_COMMENT_LIKE_SUCCESS = 'post/ADD_COMMENT_LIKE_SUCCESS';
export const ADD_COMMENT_LIKE_FAILURE = 'post/ADD_COMMENT_LIKE_FAILURE';

export const DELETE_COMMENT_LIKE_REQUEST = 'post/DELETE_COMMENT_LIKE_REQUEST';
export const DELETE_COMMENT_LIKE_SUCCESS = 'post/DELETE_COMMENT_LIKE_SUCCESS';
export const DELETE_COMMENT_LIKE_FAILURE = 'post/DELETE_COMMENT_LIKE_FAILURE';

export const ADD_MENTION = 'post/ADD_MENTION';
export const PREPARE_RECOMMENT = 'post/PREPARE_RECOMMENT';
export const CLEAR_RECOMMENT = 'post/CLEAR_RECOMMENT';

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
      case ADD_COMMENT_REQUEST: {
        draft.isAddingComment = true;
        draft.isCommentAdded = false;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.isAddingComment = false;
        draft.isCommentAdded = true;
        const postIndex = draft.mainPosts.findIndex(
          // 댓글을 추가한 포스트 id 찾기
          (v) => v.id === action.data.PostId,
        );

        if (!action.data.RecommentId) {
          // 대댓글이 아니라면 해당 포스트의 댓글 리스트에 댓글 추가
          draft.mainPosts[postIndex].Comments.push(action.data);
        } else {
          // 대댓글이라면 해당 포스트의 해당 댓글에 대댓글 추가
          const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
            (v) => v.id === action.data.RecommentId,
          );
          draft.mainPosts[postIndex].Comments[commentIndex].Recomments.push(
            action.data,
          );
        }
        draft.mentionedUser = '';
        draft.recommentId = '';
        draft.commentPostId = '';
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddingComment = false;
        draft.isCommentAdded = false;
        draft.addCommentErrorReason = action.error;
        break;
      }
      case ADD_POST_LIKE_REQUEST: {
        draft.isAddingLike = true;
        draft.isLikeAdded = false;
        break;
      }
      case ADD_POST_LIKE_SUCCESS: {
        draft.isAddingLike = false;
        draft.isLikeAdded = true;
        const postIndex = draft.mainPosts.findIndex(
          (v, i) => v.id === action.data.postId,
        );
        draft.mainPosts[postIndex].Likers.push(action.data.userId);
        break;
      }
      case ADD_POST_LIKE_FAILURE: {
        draft.isAddingLike = false;
        draft.isLikeAdded = false;
        draft.loadPostsErrorReason = action.error;
        break;
      }
      case DELETE_POST_LIKE_REQUEST: {
        draft.isDeletingLike = true;
        draft.isLikeDeleted = false;
        break;
      }
      case DELETE_POST_LIKE_SUCCESS: {
        draft.isDeletingLike = false;
        draft.isLikeDeleted = true;
        const postIndex = draft.mainPosts.findIndex(
          (v, i) => v.id === action.data.postId,
        );
        const userIndex = draft.mainPosts[postIndex].Likers.findIndex(
          (v, i) => v === action.data.userId,
        );
        draft.mainPosts[postIndex].Likers.splice(userIndex, 1);
        break;
      }
      case DELETE_POST_LIKE_FAILURE: {
        draft.isDeletingLike = false;
        draft.isLikeDeleted = false;
        draft.loadPostsErrorReason = action.error;
        break;
      }
      case ADD_COMMENT_LIKE_REQUEST: {
        draft.isAddingLike = true;
        draft.isLikeAdded = false;
        break;
      }
      case ADD_COMMENT_LIKE_SUCCESS: {
        draft.isAddingLike = false;
        draft.isLikeAdded = true;
        const postIndex = draft.mainPosts.findIndex(
          (v, i) => v.id === action.data.postId,
        );
        if (action.data.recommentId) {
          // 대댓글인 경우 좋아요 추가
          const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
            (v, i) => v.id === action.data.recommentId,
          );
          const recommentIndex = draft.mainPosts[
            postIndex
          ].Comments.Recomments.findIndex((v, i) => v.id === action.commentId);
          draft.mainPosts[commentIndex].Comments.Recomments[
            recommentIndex
          ].CommentLikers.push(action.data.userId);
          break;
        } else {
          // 댓글인 경우 좋아요 추가
          const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
            (v, i) => v.id === action.data.commentId,
          );
          draft.mainPosts[postIndex].Comments[commentIndex].CommentLikers.push(
            action.data.userId,
          );
          break;
        }
      }
      case ADD_COMMENT_LIKE_FAILURE: {
        draft.isAddingLike = false;
        draft.isLikeAdded = false;
        draft.loadPostsErrorReason = action.error;
        break;
      }
      case DELETE_COMMENT_LIKE_REQUEST: {
        draft.isDeletingLike = true;
        draft.isLikeDeleted = false;
        break;
      }
      case DELETE_COMMENT_LIKE_SUCCESS: {
        draft.isDeletingLike = false;
        draft.isLikeDeleted = true;
        const postIndex = draft.mainPosts.findIndex(
          (v, i) => v.id === action.data.postId,
        );
        if (action.data.recommentId) {
          // 대댓글인 경우 좋아요 취소
          const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
            (v, i) => v.id === action.data.recommentId,
          );
          const recommentIndex = draft.mainPosts[
            postIndex
          ].Comments.Recomments.findIndex(
            (v, i) => v.id === action.data.commentId,
          );
          const userIndex = draft.mainPosts[
            postIndex
          ].Comments.Recomments.CommentLikers.findIndex(
            (v, i) => v === action.data.userId,
          );
          draft.mainPosts[commentIndex].Comments.Recomments[
            recommentIndex
          ].CommentLikers.splice(userIndex, 1);
          break;
        } else {
          // 댓글인 경우 좋아요 취소
          const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
            (v, i) => v.id === action.data.commentId,
          );
          const userIndex = draft.mainPosts[
            postIndex
          ].Comments.CommentLikers.findIndex(
            (v, i) => v === action.data.userId,
          );
          draft.mainPosts[postIndex].Comments[commentIndex].CommentLikers.push(
            action.data.userId,
          );
          break;
        }
      }
      case DELETE_COMMENT_LIKE_FAILURE: {
        draft.isDeletingLike = false;
        draft.isLikeDeleted = false;
        draft.loadPostsErrorReason = action.error;
        break;
      }
      case PREPARE_RECOMMENT: {
        draft.recommentId = action.data.recommentId;
        draft.mentionedUser = action.data.mentionedUser;
        draft.commentPostId = action.data.commentPostId;
        break;
      }
      case CLEAR_RECOMMENT: {
        draft.recommentId = '';
        draft.mentionedUser = '';
        draft.commentPostId = '';
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
