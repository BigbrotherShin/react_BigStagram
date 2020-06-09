import React, { memo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import palette from '../../lib/styles/palette';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useRouter } from 'next/router';
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
  .logo_area {
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
  const setOffModalAction = useCallback(() => {
    router.back();
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);
  return (
    <Modal>
      <AuthTemplateBlock>
        <WhiteBox>
          <div className='logo_area'>
            <a onClick={setOffModalAction}>BroStagram</a>
          </div>
          <Button setOffModal clearButton>
            X
          </Button>
          {children}
        </WhiteBox>
      </AuthTemplateBlock>
    </Modal>
  );
});

export default AuthTemplate;
