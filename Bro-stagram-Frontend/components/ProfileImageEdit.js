import React, { memo, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  DELETE_PROFILE_IMAGE_REQUEST,
  ADD_PROFILE_IMAGE_REQUEST,
} from '../reducers/user';
import { SET_OFF_MODAL } from '../reducers/post';
import ClearButton from './common/ClearButton';
import palette from '../lib/styles/palette';

const ProfileImageEditButtonsWrapper = styled.div`
  height: 100%;

  & .Profile_image_edit_form {
    height: 100%;
  }
`;

const ProfileImageEditButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .profile_image_edit_button {
    height: 45px;
    font-weight: bold;
    border-bottom: 1px solid ${palette.gray[3]};

    &:last-child {
      font-weight: normal;
      border: none;
    }
  }
`;

const WhiteBox = styled.div`
  background: white;
  border-radius: 12px;

  @media (min-width: 736px) {
    width: 420px;
  }

  @media (max-width: 736px) {
    width: 210px;
  }

  & h1 {
    display: flex;
    height: 70px;
    font-weight: bold;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${palette.gray[3]};
  }
`;

const ProfileImageEdit = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const onClickImageDelete = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: DELETE_PROFILE_IMAGE_REQUEST,
    });
  }, []);
  const onClickCancle = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: SET_OFF_MODAL,
    });
    router.push(router.pathname);
  }, []);

  return (
    <WhiteBox>
      <header>
        <h1>프로필 사진 바꾸기</h1>
      </header>
      <ProfileImageEditButtonsWrapper>
        <form className='Profile_image_edit_form' encType='multipart/form-data'>
          <input
            type='file'
            multiple
            hidden
            ref={profileImageInput}
            onChange={onChangeImage}
          />
          <ProfileImageEditButtons>
            <ClearButton
              className='profile_image_edit_button'
              onClick={onClickImageUpload}
              fontColor={palette.blue}
            >
              프로필 사진 업로드
            </ClearButton>
            <ClearButton
              className='profile_image_edit_button'
              onClick={onClickImageDelete}
              fontColor={palette.red}
            >
              프로필 사진 삭제
            </ClearButton>
            <ClearButton
              className='profile_image_edit_button'
              onClick={onClickCancle}
            >
              취소
            </ClearButton>
          </ProfileImageEditButtons>
        </form>
      </ProfileImageEditButtonsWrapper>
    </WhiteBox>
  );
});

export default ProfileImageEdit;
