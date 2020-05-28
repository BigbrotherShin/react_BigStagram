import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { SET_OFF_MODAL } from '../../reducers/post';
import { useDispatch } from 'react-redux';

const StyledClearButton = styled.button`
  border: none;
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
`;

const ClearButton = (props) => {
  return <StyledClearButton {...props} />;
};

export default ClearButton;
