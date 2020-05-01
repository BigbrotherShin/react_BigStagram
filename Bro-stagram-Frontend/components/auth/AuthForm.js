import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { useInput } from '../../lib/customHooks';
import { useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST, LOG_IN_REQUEST } from '../../reducers/user';

// 회원가입 또는 로그인 폼

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/* 스타일링 된 input */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/* 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = memo(({ type, error }) => {
  const [id, , onChangeId] = useInput('');
  const [nickname, , onChangeNickname] = useInput('');
  const [password, , onChangePassword] = useInput('');
  const [rePassword, setRePassword] = useInput('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const dispatch = useDispatch();

  const passwordCheck = useCallback(
    (e) => {
      setPasswordCheckError(
        e.target.value !== password.slice(0, e.target.value.length),
      );
      setRePassword(e.target.value);
    },
    [password, rePassword, passwordCheckError],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (type === 'register') {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: {
            userId: id,
            nickname,
            password,
          },
        });
      } else if (type === 'login') {
        dispatch({
          type: LOG_IN_REQUEST,
          data: {
            userId: id,
            password,
          },
        });
      }
    },
    [id, nickname, password],
  );

  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form>
        <StyledInput
          autoComplete='username'
          name='username'
          placeholder='아이디'
          onChange={onChangeId}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete='nickname'
            name='nickname'
            placeholder='닉네임'
            onChange={onChangeNickname}
          />
        )}
        <StyledInput
          autoComplete='new-password'
          name='password'
          placeholder='비밀번호'
          type='password'
          onChange={onChangePassword}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete='new-password'
            name='passwordConfirm'
            placeholder='비밀번호 확인'
            type='password'
            onChange={passwordCheck}
          />
        )}
        {type === 'register' && rePassword && passwordCheckError ? (
          <ErrorMessage>비밀번호 확인 바랍니다.</ErrorMessage>
        ) : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <ButtonWithMarginTop fullWidth cyan onClick={onSubmit}>
          {text}
        </ButtonWithMarginTop>
      </form>

      <Footer>
        {type === 'login' ? (
          <Link href='/register'>
            <a>회원가입</a>
          </Link>
        ) : (
          <Link href='/login'>
            <a>로그인</a>
          </Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
});

export default AuthForm;
