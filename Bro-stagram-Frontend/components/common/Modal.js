import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SET_OFF_MODAL } from '../../reducers/post';
import { useDispatch } from 'react-redux';

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

  & .modal_children_container {
    position: static;
  }
`;

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const setOffModal = useCallback(() => {
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);
  return (
    <FullScreen>
      <div className='modal_children_container'>{children}</div>
    </FullScreen>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
