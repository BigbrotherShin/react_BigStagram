import React, { memo } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = memo(() => {
  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
  );
});

export default LoginPage;
