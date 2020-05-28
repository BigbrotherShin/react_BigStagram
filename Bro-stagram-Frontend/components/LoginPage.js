import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AuthTemplate from './auth/AuthTemplate';
import AuthForm from './auth/AuthForm';
import ModalPortal from './ModalPortal';

const LoginPage = memo(() => {
  const { logInErrorReason, isLoggedIn, me } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (isLoggedIn && me) {
      Router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <AuthTemplate>
      <AuthForm type='login' error={logInErrorReason} />
    </AuthTemplate>
  );
});

LoginPage.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default LoginPage;