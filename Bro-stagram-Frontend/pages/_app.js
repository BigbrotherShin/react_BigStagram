import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppLayout from '../components/AppLayout/AppLayout';
import reducer from '../reducers';

import '../components/AppLayout/AppLayout.css';

const makeStore = (initialState, options) => {
  // store 커스터마이징

  const middlewares = [];

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    process.env.NODE_ENV !== 'production'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  );
  // const enhancer = compose(applyMiddleware([...middlewares]));

  const store = createStore(reducer, initialState, enhancer);

  return store;
};

const MyApp = ({ Component, pageProps, store }) => {
  return (pageProps && pageProps.pathname) === '/login' ||
    (pageProps && pageProps.pathname) === '/register' ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};

  if (Component.getInitialProps) {
    // Component (pages 폴더에 있는 컴포넌트)에 getInitialProps가 있다면
    pageProps = (await Component.getInitialProps(ctx)) || {};

    return { pageProps };
  }
};

export default withRedux(makeStore)(MyApp);
