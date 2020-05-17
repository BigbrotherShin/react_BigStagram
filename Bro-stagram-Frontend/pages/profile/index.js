import React, { memo, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../../components/ProfileLayout';
import {
  LOAD_BOOKMARK_REQUEST,
  LOAD_MY_POSTS_REQUEST,
} from '../../reducers/post';
import { LOAD_OTHER_USER_INFO_REQUEST } from '../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const Profile = memo(() => {
  const { myPosts, me, userInfo } = useSelector((state) => state.user);
  const { isBookmarkLoaded } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  const loadBookmark = useCallback(() => {
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
    });
    router.push('/profile', '/profile/bookmark');
  }, []);

  const loadPosts = useCallback(() => {
    router.push({ pathname: '/profile' });
  }, []);

  return (
    <ProfileLayout
      userInfo={me}
      loadPosts={loadPosts}
      loadBookmark={loadBookmark}
    />
  );
});

Profile.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;

  dispatch({
    type: LOAD_MY_POSTS_REQUEST,
  });
};

export default Profile;
