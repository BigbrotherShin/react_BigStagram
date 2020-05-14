import React, { memo, useEffect } from 'react';
import Comment from './Comment';
import styled from 'styled-components';

const StyledCommentsList = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`;

const Comments = memo(({ comments }) => {
  return (
    <StyledCommentsList>
      {comments.map((v, i) => (
        <Comment key={+v.createdAt} commentData={v} />
      ))}
    </StyledCommentsList>
  );
});

export default Comments;
