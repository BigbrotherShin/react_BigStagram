import React, { useCallback, useEffect } from 'react';
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
  useEffect(() => {
    // 모달이 떴을 때 뒤의 영역 스크롤 고정
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
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
