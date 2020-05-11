import React, { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const PostImageWrapper = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

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

const PostImage = memo(({ postThumnail }) => {
  return (
    <PostImageWrapper className='profile_posts_item'>
      <Link href='#'>
        <a>
          <div>
            <div className='profile_posts_item_image'>
              <img src={`http://localhost:3065/${postThumnail.src}`} />
            </div>
          </div>
        </a>
      </Link>
    </PostImageWrapper>
  );
});

export default PostImage;
