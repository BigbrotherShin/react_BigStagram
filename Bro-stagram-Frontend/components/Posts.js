import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PostImage from './PostImage';
import Post from './Post';

const StyledPosts = styled.div`
  & article {
    flex-grow: 1;
  }

  & .profile_posts_wrapper {
    flex-direction: column;
    padding-bottom: 0px;
    padding-top: 0px;
  }

  & .profile_posts_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    // flex-wrap: wrap;
    // justify-content: space-between;
    // align-content: space-between;

    @media (min-width: 736px) {
      margin-bottom: 28px;
      grid-gap: 24px;
    }
  }

  & .profile_posts_item_image {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: block;
  }

  & .profile_posts_item_image:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Posts = memo(({ posts }) => {
  return (
    <StyledPosts>
      <article>
        <div>
          <div className='profile_posts_wrapper'>
            <div className='profile_posts_container'>
              {posts.map((v, i) => (
                <PostImage postThumnail={v.Images[0]} key={`${v} ${i}`} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </StyledPosts>
  );
});

export default Posts;
