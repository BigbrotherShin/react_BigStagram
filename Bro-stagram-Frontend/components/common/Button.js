import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

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
  height: 1.5rem;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  &:active {
    background: ${palette.gray[7]};
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
