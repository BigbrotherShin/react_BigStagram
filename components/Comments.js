import React, { memo } from 'react';
import Comment from './Comment';
import styled from 'styled-components';

const StyledCommentsList = styled.div`
  margin: 0.5rem 1rem;
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
