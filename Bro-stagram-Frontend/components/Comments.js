import React, { memo } from 'react';
import Comment from './Comment';
import styled from 'styled-components';

const StyledCommentsList = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`;

const Comments = memo(() => {
  return (
    <StyledCommentsList>
      <Comment />
      <Comment />
    </StyledCommentsList>
  );
});

export default Comments;
