import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ children }) => {
  return <FullScreen>{children}</FullScreen>;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
