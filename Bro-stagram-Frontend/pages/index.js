import React, { memo } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import ProfileCard from '../components/ProfileCard';
import { useSelector } from 'react-redux';

const StyledMainContainer = styled.div`
  justify-content: stretch;
  float: left;
  padding-top: 20px;
`;

const Home = memo(() => {
  const { me, isLoggedIn } = useSelector((state) => state.user);

  return (
    <StyledMainContainer className='main_container'>
      <div className='main_left'>
        <Post />
        <Post />
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
