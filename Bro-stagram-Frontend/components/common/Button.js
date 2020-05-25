import React, { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { SET_OFF_MODAL } from '../../reducers/post';
import { useDispatch } from 'react-redux';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  min-width: 4rem;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  &:active {
    background: ${palette.gray[7]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  ${(props) =>
    props.clearButton &&
    css`
      border-radius: none;
      background: none;
      &:hover {
        background: none;
      }
      &:active {
        background: none;
      }
      font-size: 1rem;
      font-weight: bold;
      padding: 0;
      color: black;
      cursor: pointer;
      min-width: 0;
    `}
`;

const Button = (props) => {
  const { clearButton, cyan, fullWidth, setOffModal } = props;
  const dispatch = useDispatch();
  const setOffModalAction = useCallback(() => {
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);
  return <StyledButton onClick={setOffModal && setOffModalAction} {...props} />;
};

export default Button;
