import React, { memo, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import palette from '../../lib/styles/palette';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { SET_OFF_MODAL } from '../../reducers/post';

// 회원가입/ 로그인 페이지의 레이아웃

/* 화면 전체를 채움 */
export const AuthTemplateBlock = styled.div`
  position: relative;
  left, top, right, bottom: 0;
  background: ${palette.gray[2]};
  /* flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 흰색 박스 */
export const WhiteBox = styled.div`
  .logo_area_logo {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: 'Pacifico', cursive;
    font-color: black;

    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
      color: black;
      text-decoration: none;
    }
  }

  .logo_area_close_button {
    position: absolute;
    right: 2px;
    top: 2px;
  }

  position: static;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radious: 2px;
  ${(props) =>
    props.followList &&
    css`
      padding: 0;
    `}
`;

const AuthTemplate = memo(({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const setOffModal = useCallback(() => {
    router.push(router.pathname);
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);
  useEffect(() => {
    return () => {
      dispatch({
        type: SET_OFF_MODAL,
      });
    };
  }, []);
  return (
    <Modal>
      <AuthTemplateBlock>
        <WhiteBox>
          <Button
            className='logo_area_close_button'
            onClick={setOffModal}
            clearButton
            setOffModal
          >
            X
          </Button>
          <div className='logo_area'>
            <div className='logo_area_logo'>
              <a onClick={setOffModal}>BroStagram</a>
            </div>
          </div>
          {children}
        </WhiteBox>
      </AuthTemplateBlock>
    </Modal>
  );
});

export default AuthTemplate;
