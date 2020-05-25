import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthTemplate from './auth/AuthTemplate';
import AuthForm from './auth/AuthForm';
import Router from 'next/router';
import ModalPortal from './ModalPortal';

const RegisterPage = memo(() => {
  const { signUpErrorReason, signedUp, me } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (me && me.id) {
      alert('로그인되어 메인페이지로 이동합니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  // useEffect(() => {
  //   if (signedUp) {
  //     alert('회원가입에 성공하셨습니다. 로그인해주세요 :D');
  //     Router.push('/login');
  //   }
  // }, [signedUp]);

  return (
    <AuthTemplate>
      <AuthForm type='register' error={signUpErrorReason} />
    </AuthTemplate>
  );
});

// RegisterPage.getInitialProps = async (ctx) => {
//   const pathname = ctx.pathname;

//   return { pathname };
// };

export default RegisterPage;
