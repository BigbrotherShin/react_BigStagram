import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';
import PropTypes from 'prop-types';

import '../components/AppLayout/AppLayout.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
