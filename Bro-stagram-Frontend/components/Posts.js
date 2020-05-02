import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
    display: flex;

    @media (min-width: 736px) {
      margin-bottom: 28px;
    }
  }

  & .profile_posts_item {
    flex: 1 0 0%;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;

    @media (min-width: 736px) {
      margin-right: 28px;
    }

    &:last-child {
      margin-right: 0;
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

const Posts = memo(() => {
  return (
    <StyledPosts>
      <article>
        <div>
          <div className='profile_posts_wrapper'>
            <div className='profile_posts_container'>
              <div className='profile_posts_item'>
                <Link href='#'>
                  <a>
                    <div>
                      <div className='profile_posts_item_image'>
                        <img src='https://pbs.twimg.com/profile_images/1248787766978080769/XbnPnDc0_400x400.jpg' />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
              <div className='profile_posts_item'>
                <Link href='#'>
                  <a>
                    <div>
                      <div className='profile_posts_item_image'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQXE_7Go4FovH9bstguTZSXGwPapB5CwcraJtmLQICkJe9weEk&usqp=CAU' />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
              <div className='profile_posts_item'>
                <Link href='#'>
                  <a>
                    <div>
                      <div className='profile_posts_item_image'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQXE_7Go4FovH9bstguTZSXGwPapB5CwcraJtmLQICkJe9weEk&usqp=CAU' />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </StyledPosts>
  );
});

export default Posts;
