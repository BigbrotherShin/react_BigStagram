import React, { memo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  HeartOutlined,
  MessageOutlined,
  UploadOutlined,
  BookOutlined,
  HeartFilled,
  BookFilled,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Slider from './common/Slider';
import {
  SET_ON_MODAL,
  ADD_POST_LIKE_REQUEST,
  DELETE_POST_LIKE_REQUEST,
  ADD_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_REQUEST,
  UNSET_POST_DETAIL,
} from '../reducers/post';
import UserName from './common/UserName';
import Time from './common/Time';
import palette from '../lib/styles/palette';
import ClearButton from './common/ClearButton';

const dummy_images = [
  'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://us.123rf.com/450wm/bigandt/bigandt1509/bigandt150900195/44961521-%EC%95%BC%EC%99%B8-%ED%99%94%EC%B0%BD%ED%95%9C-%EC%97%AC%EB%A6%84-%EB%82%A0%EC%97%90-%EC%9E%94%EB%94%94-%EC%B4%88%EC%9B%90%EC%97%90-%EC%84%B1%EA%B2%A9%EC%97%90-%EB%8B%A4%EC%84%AF-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%88%9C%EC%A2%85-%EA%B3%A8%EB%93%A0-%EB%A6%AC%ED%8A%B8%EB%A6%AC%EB%B2%84-%EA%B0%95%EC%95%84%EC%A7%80-%EC%93%B0%EB%A0%88%EA%B8%B0-.jpg?ver=6',
  'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
];

const Card = styled.div`
  ${(props) =>
    props.modalPost &&
    css`
      width: 540px;
    `}

  padding: 0;
  position: relative;

  @media (min-width: 640px) {
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    background: white;
    margin-left: -1px;
    margin-right: -1px;
  }

  & header {
    padding-left: 16px;
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

    padding: 10px 16px;
  }

  & .card_image {
    width: 100%;
    z-index: 50;
    // float: left;
    & img {
      width: 100%;
    }
  }
`;

const CardContent = styled.div`
  .card_content_body_wrapper {
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;

    padding: 8px 16px 14px;

    flex: 0 0 auto;
  }

  & .card_content_nickname {
    display: inline-block;
    font-weight: 600;
  }

  & .card_content_body {
    display: inline-block;
    white-space: pre-wrap;

    width: 100%;
  }

  & .card_content_body_hashtag {
    color: ${palette.cyan[7]};
  }
`;

const Post = memo(({ postData, postDetail, offPostDetail, modalPost }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const liked =
    me && postData.Likers && postData.Likers.find((v, i) => v.id === me.id);

  useEffect(() => {
    return () => {
      dispatch({
        type: UNSET_POST_DETAIL,
      });
    };
  }, []);

  const onLike = useCallback(() => {
    dispatch({
      type: ADD_POST_LIKE_REQUEST,
      data: {
        postId: postData.id,
      },
    });
  }, []);

  const onDislike = useCallback(() => {
    dispatch({
      type: DELETE_POST_LIKE_REQUEST,
      data: {
        postId: postData.id,
      },
    });
  }, []);

  const addBookmark = useCallback(() => {
    dispatch({
      type: ADD_BOOKMARK_REQUEST,
      data: {
        postId: postData.id,
      },
    });
  }, []);

  const deleteBookmark = useCallback(() => {
    dispatch({
      type: DELETE_BOOKMARK_REQUEST,
      data: {
        postId: postData.id,
      },
    });
  }, []);

  return (
    <>
      <Card modalPost={modalPost}>
        <header className='explore_card_two'>
          <UserName user={postData.Writer} />
          {postDetail ? (
            <ClearButton onClick={offPostDetail}>X</ClearButton>
          ) : null}
        </header>
        <div className='card_image explore_card_one'>
          {postData.Images.length !== 0 && <Slider images={postData.Images} />}
        </div>
        {me ? (
          <div className='card_info explore_card_two'>
            <div className='card_info_left'>
              {liked ? (
                <HeartFilled
                  onClick={onDislike}
                  style={{ color: 'hotpink' }}
                  className='card_info_icons'
                />
              ) : (
                <HeartOutlined onClick={onLike} className='card_info_icons' />
              )}

              <MessageOutlined className='card_info_icons' />
              <UploadOutlined className='card_info_icons' />
            </div>
            <div className='card_info_right'>
              {me &&
              me.BookmarkPosts &&
              me.BookmarkPosts.find((v, i) => v.id === postData.id) ? (
                <BookFilled
                  onClick={deleteBookmark}
                  className='card_info_icons'
                />
              ) : (
                <BookOutlined
                  onClick={addBookmark}
                  className='card_info_icons'
                />
              )}
            </div>
          </div>
        ) : null}

        <CardContent className='card_content explore_card_two'>
          <section className='card_content_likes_wrapper'>
            <div className='card_content_likes'>
              {postData.Likers && postData.Likers.length === 0 ? null : (
                <div>좋아요 {postData.Likers.length}개</div>
              )}
            </div>
          </section>
          <div className='card_content_body_wrapper'>
            <span className='card_content_body'>
              <UserName user={postData.Writer} bodyName />
              {postData.content.split(/(#[^\s]+)/g).map((v, i) => {
                if (v.match(/(#[^\s]+)/g)) {
                  return (
                    <Link
                      key={`${v} ${i}`}
                      href={{
                        pathname: '/hashtag',
                        query: { hashtagData: v.slice(1) },
                      }}
                      as={`/hashtag/${v.slice(1)}`}
                    >
                      <a className='card_content_body_hashtag'>{v}</a>
                    </Link>
                  );
                }
                return v;
              })}
            </span>
            <Time
              fontSize='14px'
              fontColor={palette.gray[6]}
              className='card_time'
            >
              {postData.createdAt}
            </Time>
          </div>
          {postData.Comments ? (
            <Comments className='card_comments' comments={postData.Comments} />
          ) : null}
          {me ? (
            <CommentForm className='card_comment_form' postId={postData.id} />
          ) : null}
        </CardContent>
      </Card>
    </>
  );
});

export default Post;
