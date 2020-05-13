import React, { memo, useCallback } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { PREPARE_RECOMMENT } from '../reducers/post';
import Comments from './Comments';

const CommentDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  & span {
    font-weight: bold;
  }

  .comment_body {
    margin-left: 10px;
    margin-right: 10px;
  }

  .comment_like {
    margin-left: auto;
  }
`;

const Comment = memo(({ commentData }) => {
  // const { mentionedUser, recommentId } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onRecomment = useCallback(() => {
    dispatch({
      type: PREPARE_RECOMMENT,
      data: {
        mentionedUser: commentData.Commenter.nickname,
        recommentId: commentData.RecommentId
          ? commentData.RecommentId
          : commentData.id,
      },
    });
  }, []);

  return (
    <>
      <CommentDiv>
        <span>{commentData.Commenter.nickname}</span>
        <div className='comment_body'>
          <div className='comment_body_content'>
            {commentData.content.split(/(@[^\s]+)/g).map((v, i) => {
              if (v.match(/(@[^\s]+)/g)) {
                return (
                  <Link
                    key={`${v} ${i}`}
                    href={{
                      pathname: '/profile',
                      query: { nickname: v.slice(1) },
                    }}
                    as={`/profile/${v.slice(1)}`}
                  >
                    <a>{v}</a>
                  </Link>
                );
              }
              return v;
            })}
          </div>
          <div className='comment_body_recomment'>
            <button onClick={onRecomment}>답글 달기</button>
          </div>

          {/* <Comments comments={commentData.Recomments} /> */}
        </div>
        <HeartOutlined className='comment_like' />
      </CommentDiv>
    </>
  );
});

export default Comment;
