import React, { memo } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import UserInfo from './UserInfo';

const CommentDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  .comment_body {
    margin-left: 10px;
    margin-right: 10px;
  }

  .comment_like {
    margin-left: auto;
  }
`;

const Comment = memo(() => {
  return (
    <CommentDiv>
      <UserInfo />
      <div className='comment_body'>댓글 내용</div>
      <HeartOutlined className='comment_like' />
    </CommentDiv>
  );
});

export default Comment;
