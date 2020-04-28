import React, { memo } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = memo(() => {
  return (
    <AuthTemplate>
      <AuthForm type='register' />
    </AuthTemplate>
  );
});

RegisterPage.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default RegisterPage;
