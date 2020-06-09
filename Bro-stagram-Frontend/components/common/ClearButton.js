import React, { useEffect, useCallback } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { SET_OFF_MODAL } from '../../reducers/post';
import { useDispatch } from 'react-redux';

const StyledClearButton = styled.button`
  border: none;
  outline: none;
  background: none;

  &:hover {
    background: none;
  }
  &:active {
    background: none;
  }
  padding: 0;
  cursor: pointer;
  min-width: 0;

  ${(props) =>
    props.fontColor &&
    css`
      color: ${props.fontColor};
    `}
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
  ${(props) =>
    props.setOffModal &&
    css`
      position: absolute;
      right: 4px;
      top: 4px;
    `}
`;

const ClearButton = (props) => {
  const dispatch = useDispatch();
  const offModal = useCallback(() => {
    Router.back();
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);
  return (
    <StyledClearButton onClick={props.setOffModal && offModal} {...props} />
  );
};

export default ClearButton;
