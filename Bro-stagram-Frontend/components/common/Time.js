import React, { memo } from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import palette from '../../lib/styles/palette';
import styled, { css } from 'styled-components';

moment.locale('ko');

const StyledTime = styled.span`
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
  ${(props) =>
    props.fontColor &&
    css`
      color: ${props.fontColor};
    `}
`;

const Time = memo(({ children, ...props }) => {
  return (
    <Tooltip title={moment(children).format('ll')}>
      <StyledTime {...props}>{moment(children).fromNow()}</StyledTime>
    </Tooltip>
  );
});

export default Time;
