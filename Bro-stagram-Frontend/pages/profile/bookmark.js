import React, { memo, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../../components/ProfileLayout';
import {
  LOAD_BOOKMARK_REQUEST,
  LOAD_MY_POSTS_REQUEST,
} from '../../reducers/post';
import { LOAD_OTHER_USER_INFO_REQUEST } from '../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const ProfileBookmark = memo(() => {
  const { myPosts, me, userInfo } = useSelector((state) => state.user);
  const { isBookmarkLoaded } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  const loadBookmark = useCallback(() => {
    router.push('/profile/bookmark');
  }, []);

  const loadPosts = useCallback(() => {
    router.push({ pathname: '/profile' });
  }, []);

  return (
    <ProfileLayout
      loading={!(me && me.BookmarkPosts && isBookmarkLoaded)}
      userInfo={me}
      loadPosts={loadPosts}
      loadBookmark={loadBookmark}
      posts={me && me.BookmarkPosts}
    />
  );
});

ProfileBookmark.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;
  const state = ctx.store.getState();

  dispatch({
    type: LOAD_BOOKMARK_REQUEST,
  });
};

export default ProfileBookmark;
