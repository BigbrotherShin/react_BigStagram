import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import ProfileCard from '../components/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_BOOKMARK_REQUEST,
} from '../reducers/post';
import Router from 'next/router';
import { LOAD_MY_FOLLOW_REQUEST } from '../reducers/user';

const StyledMainContainer = styled.div`
  justify-content: stretch;
  float: left;
  padding-top: 20px;
`;

const Home = memo(() => {
  const {
    me,
    isLoggedIn,
    isLoggingIn,
    isLoadingPosts,
    isPostsLoaded,
  } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      Router.push('/explore');
    }
    if (me) {
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
      });
    }
  }, [me]);

  if (!me) {
    return <div>게시글 불러오는 중..</div>;
  }

  if (isLoggedIn && !(me && me.BookmarkPosts)) {
    return <div>북마크 정보 불러오는 중..</div>;
  }

  if (isLoadingPosts) {
    return <div>게시글 불러오는 중..</div>;
  }

  return (
    <StyledMainContainer className='main_container'>
      <div className='main_left'>
        {mainPosts.map((v, i) => (
          <Post key={v.id} postData={v} />
        ))}
      </div>
      <div className='main_right'>
        <div className='main_right_items main_right'>
          {me && me.id ? <ProfileCard /> : null}
        </div>
      </div>
    </StyledMainContainer>
  );
});

Home.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;
  const state = ctx.store.getState();

  dispatch({
    type: LOAD_MY_FOLLOW_REQUEST,
  });

  if (
    state.user.isLoggedIn &&
    !(state.user.me && state.user.me.BookmarkPosts)
  ) {
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
    });
  }
};

export default Home;
