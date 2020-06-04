import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PostImage from './PostImage';
import Post from './Post';
import ModalPortal from './ModalPortal';
import Modal from './common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_ON_MODAL,
  LOAD_POST_DETAIL_REQUEST,
  SET_OFF_MODAL,
} from '../reducers/post';
import ClearButton from './common/ClearButton';
import { useRouter } from 'next/router';

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
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    // flex-wrap: wrap;
    // justify-content: space-between;
    // align-content: space-between;

    @media (min-width: 736px) {
      margin-bottom: 28px;
      grid-gap: 24px;
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

const FixedClearButton = styled(ClearButton)`
  position: fixed;
  right: 8px;
  top: 8px;

  font-size: 24px;
`;

const Posts = memo(({ posts }) => {
  const dispatch = useDispatch();
  const { postDetail, onModal, isLoadingPostDetail } = useSelector(
    (state) => state.post,
  );
  const router = useRouter();

  const onPostDetail = useCallback(
    (postId) => () => {
      router.push(router.pathname, '/explore/detail');
      dispatch({
        type: SET_ON_MODAL,
      });
      dispatch({
        type: LOAD_POST_DETAIL_REQUEST,
        data: postId,
      });
    },
    [],
  );

  const offPostDetail = useCallback(() => {
    router.push(router.pathname);
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);

  if (isLoadingPostDetail && !postDetail) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <StyledPosts>
        <article>
          <div>
            <div className='profile_posts_wrapper'>
              <div className='profile_posts_container'>
                {posts.map((v, i) => (
                  <PostImage
                    onClick={onPostDetail(v.id)}
                    postThumnail={v.Images[0]}
                    key={`${v.id} ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>
      </StyledPosts>
      {onModal && router.asPath === '/explore/detail' ? (
        <ModalPortal>
          <Modal>
            <Post postData={postDetail} />
            <FixedClearButton onClick={offPostDetail}>X</FixedClearButton>
          </Modal>
        </ModalPortal>
      ) : null}
    </>
  );
});

export default Posts;
