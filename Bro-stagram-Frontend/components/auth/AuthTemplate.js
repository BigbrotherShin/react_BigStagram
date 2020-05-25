import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import palette from '../../lib/styles/palette';
import Modal from '../common/Modal';

// 회원가입/ 로그인 페이지의 레이아웃

/* 화면 전체를 채움 */
export const AuthTemplateBlock = styled.div`
  // position: absolute;
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

    & a:link,
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
  return (
    <Modal>
      <AuthTemplateBlock>
        <WhiteBox>
          <div className='logo_area'>
            <Link href='/'>
              <a>BroStagram</a>
            </Link>
          </div>
          {children}
        </WhiteBox>
      </AuthTemplateBlock>
    </Modal>
  );
});

export default AuthTemplate;
