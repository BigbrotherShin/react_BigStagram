import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import AuthTemplate from './auth/AuthTemplate';
import AuthForm from './auth/AuthForm';
import ModalPortal from './ModalPortal';
import { SET_OFF_MODAL } from '../reducers/post';

const LoginPage = memo(() => {
  const { logInErrorReason, isLoggedIn, me } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && me) {
      Router.push('/');
      dispatch({
        type: SET_OFF_MODAL,
      });
    }
  }, [isLoggedIn, me]);

  return (
    <AuthTemplate>
      <AuthForm type='login' error={logInErrorReason} />
    </AuthTemplate>
  );
});

// LoginPage.getInitialProps = async (ctx) => {
//   const pathname = ctx.pathname;

//   return { pathname };
// };

export default LoginPage;
