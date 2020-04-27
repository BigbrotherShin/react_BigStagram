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

const Card = styled.div`
  background-color: white;

  & header {
    display: flex;
    align-items: center;
  }

  .card_info {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
  }

  .card_info_icons {
    margin: 0.3rem 0.5rem;
  }

  & .card_image {
    width: 100%;

    & img {
      width: 100%;
    }
  }
`;

const CardContent = styled.div`
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;

  & .card_content_nickname {
    display: inline-block;
    float: left;
    font-weight: 600;
    margin: 0.3rem;
  }

  & .card_content_body {
    display: inline-block;
    clear: both;
    margin: 0.3rem;
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
        <div className='card_content_nickname'>Nickname</div>
        <div className='card_content_body'>
          This is some text. This is some text. This is some text. This is some
          text. This is some text. This is some text. This is some text. This is
          some text. This is some text. This is some text. This is some text.
          This is some text.
        </div>
      </CardContent>
      <Comments className='card_comments' />
      <CommentForm className='card_comment_form' />
    </Card>
  );
});

export default Post;
