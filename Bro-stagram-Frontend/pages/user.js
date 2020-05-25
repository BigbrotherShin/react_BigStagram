import React, { memo, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import ProfileLayout from '../components/ProfileLayout';
import { LOAD_BOOKMARK_REQUEST, LOAD_MY_POSTS_REQUEST } from '../reducers/post';
import {
  LOAD_OTHER_USER_INFO_REQUEST,
  ADD_FOLLOWING_REQUEST,
  DELETE_FOLLOWING_REQUEST,
  LOAD_MY_FOLLOW_REQUEST,
} from '../reducers/user';

const User = memo(({ userData }) => {
  const { me, userInfo, otherUserLoaded, isOtherUserLoading } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const isId = parseInt(userData, 10) ? parseInt(userData, 10) : userData;

  useEffect(() => {
    if ((me && me.id === isId) || (me && me.nickname === isId)) {
      router.push('/profile');
    }
  }, [me && me.id && me.nickname]);

  const isFollowing =
    me &&
    me.Followings.find((v) => (isId ? v.id === isId : v.nickname === isId));

  const loadPosts = useCallback(() => {
    router.push(
      { pathname: '/user', query: { userData: userData } },
      `/user/${userData}`,
    );
  }, []);

  const addFollowing = useCallback(
    (userData) => () => {
      dispatch({
        type: ADD_FOLLOWING_REQUEST,
        data: {
          userId: userData.id,
        },
      });
    },
    [],
  );

  const deleteFollowing = useCallback(
    (userData) => () => {
      dispatch({
        type: DELETE_FOLLOWING_REQUEST,
        data: {
          userId: userData.id,
        },
      });
    },
    [],
  );

  return (
    <ProfileLayout
      loading={
        !(
          otherUserLoaded &&
          userInfo &&
          userInfo.id &&
          userInfo.Posts &&
          userInfo.Followers &&
          userInfo.Followings
        )
      }
      isLoggedIn={me}
      userInfo={userInfo}
      loadPosts={loadPosts}
      addFollowing={addFollowing}
      deleteFollowing={deleteFollowing}
      isFollowing={isFollowing}
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
