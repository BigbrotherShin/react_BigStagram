import React, { memo, useEffect, useCallback, useRef } from 'react';

import { useRouter } from 'next/router';
import ProfileLayout from '../../components/ProfileLayout';
import {
  LOAD_BOOKMARK_REQUEST,
  LOAD_MY_POSTS_REQUEST,
  SET_ON_MODAL,
  SET_OFF_MODAL,
} from '../../reducers/post';
import {
  LOAD_OTHER_USER_INFO_REQUEST,
  LOAD_MY_FOLLOW_REQUEST,
  ADD_PROFILE_IMAGE_REQUEST,
  DELETE_PROFILE_IMAGE_REQUEST,
} from '../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import ModalPortal from '../../components/ModalPortal';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import ProfileImageEdit from '../../components/ProfileImageEdit';

const Profile = () => {
  const {
    myPosts,
    me,
    userInfo,
    isProfileImageAdding,
    ProfileImageAdded,
    isProfileImageDeleting,
    ProfileImageDeleted,
  } = useSelector((state) => state.user);
  const {
    isBookmarkLoaded,
    isLoadingPosts,
    isPostsLoaded,
    onModal,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (ProfileImageAdded || ProfileImageDeleted) {
      router.push(router.pathname);
      dispatch({
        type: SET_OFF_MODAL,
      });
    }
  }, [ProfileImageAdded, ProfileImageDeleted]);

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
            <ProfileImageEdit />
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
