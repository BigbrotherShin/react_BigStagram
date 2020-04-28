import React, { memo } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = memo(() => {
  return (
    <AuthTemplate>
      <AuthForm type='login' />
    </AuthTemplate>
  );
});

LoginPage.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default LoginPage;
