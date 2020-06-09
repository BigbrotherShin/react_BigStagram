import React, { memo, useCallback, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  PREPARE_RECOMMENT,
  ADD_COMMENT_LIKE_REQUEST,
  DELETE_COMMENT_LIKE_REQUEST,
} from '../reducers/post';
import Comments from './Comments';
import ClearButton from '../components/common/ClearButton';
import Time from './common/Time';
import palette from '../lib/styles/palette';

const CommentDiv = styled.div`
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;

  ${(props) =>
    props.recomment &&
    css`
      padding-left: 0;
      padding-right: 0;
    `}
`;

const CommentBody = styled.div`
  display: flex;

  & span {
    font-weight: bold;
    padding-right: 8px;
  }

  & .comment_body_like {
    margin-left: auto;
  }

  & .comment_mention_user {
    color: ${palette.cyan[7]};
  }
`;

const CommentButtons = styled.div`
  margin-top: 8px;
  & * {
    margin-right: 10px;
    color: ${palette.gray[6]};
    font-size: 14px;
  }
  & *:last-child {
    margin-right: 0;
  }
`;

const MoreRecommentsWrapper = styled.div`
  margin-top: 14px;
  display: flex;

  & .comment_see_more_recomments_dots {
    border-bottom: 1px solid ${palette.gray[5]};
    display: inline-block;
    height: 0;
    margin-right: 16px;
    vertical-align: middle;
    width: 24px;
    flex-grow: 0;
  }

  & .comment_see_more_recomments {
    display: inline-block;
    flex: 1;
  }
`;

const Comment = memo(({ commentData, recomment }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [seeRecomments, setSeeRecomments] = useState(false);

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

  const onSeeRecomments = useCallback(() => {
    setSeeRecomments((prevState) => !prevState);
  }, []);

  return (
    <>
      <CommentDiv recomment={recomment}>
        <CommentBody>
          <span>{commentData.Commenter.nickname}</span>
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
                    <a className='comment_mention_user'>{v}</a>
                  </Link>
                );
              }
              return v;
            })}
          </div>
          {me ? (
            <div className='comment_body_like'>
              {liked ? (
                <HeartFilled
                  onClick={onCommentUnlike}
                  style={{ color: 'hotpink' }}
                />
              ) : (
                <HeartOutlined onClick={onCommentLike} />
              )}
            </div>
          ) : null}
        </CommentBody>
        <CommentButtons className='comment_recomment'>
          <Time>{commentData.createdAt}</Time>
          {commentData && commentData.CommentLikers.length !== 0 ? (
            <span className='comment_recomment_like_button'>
              좋아요 {commentData.CommentLikers.length}
            </span>
          ) : null}
          <ClearButton onClick={onRecomment}>답글 달기</ClearButton>
        </CommentButtons>
        {commentData &&
        commentData.Recomments &&
        commentData.Recomments.length !== 0 ? (
          <MoreRecommentsWrapper>
            <div>
              <div className='comment_see_more_recomments_dots'></div>
            </div>
            <div className='comment_see_more_recomments'>
              <div>
                <ClearButton fontSize='14' onClick={onSeeRecomments}>
                  답글
                  {seeRecomments
                    ? ' 숨기기'
                    : ` 보기 (${
                        commentData &&
                        commentData.Recomments &&
                        commentData.Recomments.length
                      }개)`}
                </ClearButton>
                {commentData.Recomments &&
                commentData.Recomments.length !== 0 &&
                seeRecomments ? (
                  <Comments recomment comments={commentData.Recomments} />
                ) : null}
              </div>
            </div>
          </MoreRecommentsWrapper>
        ) : null}
      </CommentDiv>
    </>
  );
});

export default Comment;
