import React, { memo, useCallback } from 'react';
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
import Slider from './common/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ON_MODAL } from '../reducers/post';

const dummy_images = [
  'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://us.123rf.com/450wm/bigandt/bigandt1509/bigandt150900195/44961521-%EC%95%BC%EC%99%B8-%ED%99%94%EC%B0%BD%ED%95%9C-%EC%97%AC%EB%A6%84-%EB%82%A0%EC%97%90-%EC%9E%94%EB%94%94-%EC%B4%88%EC%9B%90%EC%97%90-%EC%84%B1%EA%B2%A9%EC%97%90-%EB%8B%A4%EC%84%AF-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%88%9C%EC%A2%85-%EA%B3%A8%EB%93%A0-%EB%A6%AC%ED%8A%B8%EB%A6%AC%EB%B2%84-%EA%B0%95%EC%95%84%EC%A7%80-%EC%93%B0%EB%A0%88%EA%B8%B0-.jpg?ver=6',
  'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
];

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

const Post = memo((data) => {
  return data ? (
    <Card>
      <header>{<UserInfo data={data && data.user} />}</header>
      <div className='card_image'>
        <Slider images={dummy_images} />
        {/* <img
          src={
            'https://us.123rf.com/450wm/bigandt/bigandt1509/bigandt150900195/44961521-%EC%95%BC%EC%99%B8-%ED%99%94%EC%B0%BD%ED%95%9C-%EC%97%AC%EB%A6%84-%EB%82%A0%EC%97%90-%EC%9E%94%EB%94%94-%EC%B4%88%EC%9B%90%EC%97%90-%EC%84%B1%EA%B2%A9%EC%97%90-%EB%8B%A4%EC%84%AF-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%88%9C%EC%A2%85-%EA%B3%A8%EB%93%A0-%EB%A6%AC%ED%8A%B8%EB%A6%AC%EB%B2%84-%EA%B0%95%EC%95%84%EC%A7%80-%EC%93%B0%EB%A0%88%EA%B8%B0-.jpg?ver=6'
          }
          alt='card_image'
        /> */}
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
            <a className='card_content_nickname'>nickname</a>
          </Link>
          <span className='card_content_body'>
            내용내용내용내용내용내용내용
          </span>
        </div>
        <div className='card_time'>2020.5.7</div>
        <Comments className='card_comments' />
        <CommentForm className='card_comment_form' />
      </CardContent>
    </Card>
  ) : null;
});

export default Post;
