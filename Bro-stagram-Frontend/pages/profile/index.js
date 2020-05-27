import React, { memo, useEffect, useCallback, useRef } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../../components/ProfileLayout';
import {
  LOAD_BOOKMARK_REQUEST,
  LOAD_MY_POSTS_REQUEST,
  SET_ON_MODAL,
} from '../../reducers/post';
import {
  LOAD_OTHER_USER_INFO_REQUEST,
  LOAD_MY_FOLLOW_REQUEST,
  ADD_PROFILE_IMAGE_REQUEST,
} from '../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import ModalPortal from '../../components/ModalPortal';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const Profile = () => {
  const { myPosts, me, userInfo } = useSelector((state) => state.user);
  const {
    isBookmarkLoaded,
    isLoadingPosts,
    isPostsLoaded,
    onModal,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  const loadBookmark = useCallback(() => {
    // dispatch({
    //   type: LOAD_BOOKMARK_REQUEST,
    // });
    router.push('/profile/bookmark');
  }, []);

  const loadPosts = useCallback(() => {
    router.push({ pathname: '/profile' });
  }, []);

  const setProfileImage = useCallback(() => {
    router.push(router.pathname, '/profileImage');
    dispatch({
      type: SET_ON_MODAL,
    });
  }, []);

  const profileImageInput = useRef();

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      return imageFormData.append('profileImage', f);
    });

    dispatch({
      type: ADD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(
    (e) => {
      e.preventDefault();
      profileImageInput.current.click();
    },
    [profileImageInput.current],
  );

  return (
    <>
      <ProfileLayout
        loading={
          !(me && me.Posts && isPostsLoaded && me.Followers && me.Followings)
        }
        userInfo={me}
        loadPosts={loadPosts}
        loadBookmark={loadBookmark}
        profile
        setProfileImage={setProfileImage}
      />
      {onModal && router.asPath === '/profileImage' ? (
        <ModalPortal>
          <Modal>
            <Button clearButton setOffModal>
              X
            </Button>
            <form encType='multipart/form-data'>
              <input
                type='file'
                multiple
                hidden
                ref={profileImageInput}
                onChange={onChangeImage}
              />
              <button onClick={onClickImageUpload}>프로필 사진 업로드</button>
            </form>
          </Modal>
        </ModalPortal>
      ) : null}
    </>
  );
};

Profile.getInitialProps = async (ctx) => {
  const dispatch = ctx.store.dispatch;
  const state = ctx.store.getState();

  dispatch({
    type: LOAD_MY_POSTS_REQUEST,
  });
};

export default Profile;
