import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledWhiteBox = styled.div`
  background: white;
  border-radius: 12px;

  @media (min-width: 736px) {
    width: 420px;
  }

  @media (max-width: 736px) {
    width: 210px;
  }

  & h1 {
    display: flex;
    height: 70px;
    font-weight: bold;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${palette.gray[3]};
  }
`;

const WhiteBox = memo((props) => {
  return <StyledWhiteBox {...props} />;
});

export default WhiteBox;
