import React, { memo, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../components/ProfileLayout';
import { LOAD_BOOKMARK_REQUEST, LOAD_MY_POSTS_REQUEST } from '../reducers/post';
import { LOAD_OTHER_USER_INFO_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const User = memo(({ id }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { isBookmarkLoaded } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  const loadPosts = useCallback(() => {
    router.push({ pathname: '/user', query: { id: id } }, `/user/${id}`);
  }, []);

  return <ProfileLayout userInfo={userInfo} loadPosts={loadPosts} />;
});

User.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;

  dispatch({
    type: LOAD_OTHER_USER_INFO_REQUEST,
    data: ctx.query.id,
  });
  return { id: ctx.query.id };
};

export default User;
