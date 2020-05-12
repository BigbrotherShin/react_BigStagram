import React, { memo } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';

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

const Comment = memo(({ commentData }) => {
  return (
    <CommentDiv>
      <span>Jack</span>
      <div className='comment_body'>
        {commentData.content.split(/(@[^\s]+)/g).map((v, i) => {
          if (v.match(/(@[^\s]+)/g)) {
            return (
              <Link
                key={`${v} ${i}`}
                href={{ pathname: '/profile', query: { nickname: v.slice(1) } }}
                as={`/profile/${v.slice(1)}`}
              >
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })}
      </div>
      <HeartOutlined className='comment_like' />
    </CommentDiv>
  );
});

export default Comment;
