import React, { memo, useEffect } from 'react';
import Comment from './Comment';
import styled, { css } from 'styled-components';

const StyledCommentsList = styled.div`
  max-height: 30vh;
  overflow: auto;
  padding-bottom: 12px;

  ${(props) =>
    props.recomment &&
    css`
      max-height: none;
    `}
`;

const Comments = memo(({ comments, recomment }) => {
  return (
    <StyledCommentsList recomment={recomment}>
      {comments.map((v, i) => (
        <Comment key={v.createdAt + i} commentData={v} recomment={recomment} />
      ))}
    </StyledCommentsList>
  );
});

export default Comments;
