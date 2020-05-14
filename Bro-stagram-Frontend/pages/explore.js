import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import Posts from '../components/Posts';

const Explore = memo(() => {
  const { mainPosts } = useSelector((state) => state.post);

  return <Posts posts={mainPosts} />;
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
