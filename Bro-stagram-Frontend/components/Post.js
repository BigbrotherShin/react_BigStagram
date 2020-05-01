import React, { memo } from 'react';
import {
  HeartOutlined,
  MessageOutlined,
  UploadOutlined,
  BookOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserInfo from './UserInfo';
import Link from 'next/link';

const Card = styled.div`
  padding: 0;

  @media (min-width: 640px) {
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    background: white;
    margin-left: -1px;
    margin-right: -1px;
  }

  & header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.3rem 1rem;
    height: 60px;
    padding: 16px;
  }

  .card_info {
    display: flex;
    padding-right: 16px;
    padding-left: 16px;
    margin-top: 4px;
    font-size: 1.2rem;
  }

  .card_info_right {
    margin-left: auto;
  }

  .card_info_icons {
    margin: 0.3rem 0.5rem;
    font-size: 24px;
  }

  .card_content_likes_wrapper {
    display: flex;
    justify-content: flex-start;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 8px;
  }

  & .card_image {
    width: 100%;

    & img {
      width: 100%;
    }
  }
`;

const CardContent = styled.div`
  .card_content_body_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 16px;
    padding-right: 16px;
    flex: 0 0 auto;
  }

  & .card_content_nickname {
    display: inline-block;
    font-weight: 600;
  }

  & .card_content_body {
    display: inline-block;

    width: 100%;
  }

  .card_time {
    padding-left: 16px;
    margin-bottom: 4px;
  }
`;

const Post = memo(() => {
  return (
    <Card>
      <header>
        <UserInfo />
      </header>
      <div className='card_image'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQXE_7Go4FovH9bstguTZSXGwPapB5CwcraJtmLQICkJe9weEk&usqp=CAU'
          alt='card_image'
        />
      </div>
      <div className='card_info'>
        <div className='card_info_left'>
          <HeartOutlined className='card_info_icons' />
          <MessageOutlined className='card_info_icons' />
          <UploadOutlined className='card_info_icons' />
        </div>
        <div className='card_info_right'>
          <BookOutlined className='card_info_icons' />
        </div>
      </div>
      <CardContent className='card_content'>
        <section className='card_content_likes_wrapper'>
          <div className='card_content_likes'>
            <Link href='#'>
              <a>example</a>
            </Link>
            님 외
            <Link href='#'>
              <a> 여러 명</a>
            </Link>
            이 좋아합니다.
          </div>
        </section>
        <div className='card_content_body_wrapper'>
          <Link href='#'>
            <a className='card_content_nickname'>Nickname</a>
          </Link>
          <span className='card_content_body'>
            This is some text. This is some text. This is some text. This is
            some text. This is some text. This is some text. This is some text.
            This is some text. This is some text. This is some text. This is
            some text. This is some text.
          </span>
        </div>
        <div className='card_time'>7시간 전</div>
        <Comments className='card_comments' />
        <CommentForm className='card_comment_form' />
      </CardContent>
    </Card>
  );
});

export default Post;
