import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import Posts from '../components/Posts';
import { StyledProfileContainer } from '../components/ProfileLayout';

const Explore = memo(() => {
  const { explorePosts, isLoadingPosts, isPostsLoaded } = useSelector(
    (state) => state.post,
  );

  if (isLoadingPosts) {
    return <div>게시글 로딩중...</div>;
  }

  return (
    <StyledProfileContainer>
      <Posts posts={explorePosts} />
    </StyledProfileContainer>
  );
});

Explore.getInitialProps = async (ctx) => {
  ctx.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
    data: {
      onlyImages: true,
    },
  });
};

export default Explore;
