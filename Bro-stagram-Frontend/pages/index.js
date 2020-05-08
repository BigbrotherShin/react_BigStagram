import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import ProfileCard from '../components/ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const StyledMainContainer = styled.div`
  justify-content: stretch;
  float: left;
  padding-top: 20px;
`;

const Home = memo(() => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    console.log('mainPosts', mainPosts);
  }, []);

  return (
    <StyledMainContainer className='main_container'>
      <div className='main_left'>
        {mainPosts.length !== 0
          ? mainPosts.map((v, i) => <Post key={+v.createdAt} data={v} />)
          : null}
      </div>
      <div className='main_right'>
        <div className='main_right_items main_right'>
          {me && me.id ? <ProfileCard /> : null}
        </div>
      </div>
    </StyledMainContainer>
  );
});

export default Home;
