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
      {comments.map((v, i) =>
        !v.RecommentId ? <Comment key={+v.createdAt} commentData={v} /> : null,
      )}
    </StyledCommentsList>
  );
});

export default Comments;
