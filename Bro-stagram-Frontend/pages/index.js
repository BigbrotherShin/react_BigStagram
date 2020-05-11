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

  // useEffect(() => {
  //   console.log('mainPosts', mainPosts);
  //   dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
  //   });
  // }, []);

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
  ctx.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
