import React, { memo, useCallback } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  PREPARE_RECOMMENT,
  ADD_COMMENT_LIKE_REQUEST,
  DELETE_COMMENT_LIKE_REQUEST,
} from '../reducers/post';
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
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onRecomment = useCallback(() => {
    dispatch({
      type: PREPARE_RECOMMENT,
      data: {
        mentionedUser: commentData.Commenter.nickname,
        recommentId: commentData.RecommentId
          ? commentData.RecommentId
          : commentData.id,
        commentPostId: commentData.PostId,
      },
    });
  }, []);

  const liked =
    me &&
    commentData.CommentLikers &&
    commentData.CommentLikers.find((v, i) => v.id === me.id);

  const onCommentLike = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_LIKE_REQUEST,
      data: {
        postId: commentData.PostId,
        commentId: commentData.id,
        // recommentId: commentData.RecommentId || null,
      },
    });
  }, []);

  const onCommentUnlike = useCallback(() => {
    dispatch({
      type: DELETE_COMMENT_LIKE_REQUEST,
      data: {
        postId: commentData.PostId,
        commentId: commentData.id,
        // recommentId: commentData.RecommentId || null,
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
                      pathname: '/user',
                      query: { userData: v.slice(1) },
                    }}
                    as={`/user/${v.slice(1)}`}
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
        </div>
        {liked ? (
          <HeartFilled
            onClick={onCommentUnlike}
            className='comment_like'
            style={{ color: 'hotpink' }}
          />
        ) : (
          <HeartOutlined onClick={onCommentLike} className='comment_like' />
        )}
      </CommentDiv>
      {commentData.Recomments && commentData.Recomments.length !== 0 ? (
        <Comments comments={commentData.Recomments} />
      ) : null}
    </>
  );
});

export default Comment;
