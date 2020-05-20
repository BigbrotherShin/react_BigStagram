import React, { memo, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../components/ProfileLayout';
import { LOAD_BOOKMARK_REQUEST, LOAD_MY_POSTS_REQUEST } from '../reducers/post';
import { LOAD_OTHER_USER_INFO_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const User = memo(({ userData }) => {
  const { userInfo, otherUserLoaded, isOtherUserLoading } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const loadPosts = useCallback(() => {
    router.push(
      { pathname: '/user', query: { userData: userData } },
      `/user/${userData}`,
    );
  }, []);

  return (
    <ProfileLayout
      loading={!(otherUserLoaded && userInfo && userInfo.id && userInfo.Posts)}
      userInfo={userInfo}
      loadPosts={loadPosts}
    />
  );
});

User.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;

  console.log(ctx.query.userData);

  dispatch({
    type: LOAD_OTHER_USER_INFO_REQUEST,
    data: ctx.query.userData,
  });
  return { userData: ctx.query.userData };
};

export default User;
