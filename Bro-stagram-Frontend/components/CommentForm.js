import React, { memo, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Button from './common/Button';

const StyledCommentFormDiv = styled.div`
  display: flex;
  margin: 0.5rem 1rem;

  & form {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    justify-content: space-between;
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;

  width: 100%;
  font-size: 1rem;
  border: none;

  &:focus {
    outline: none;
  }

  & + Button {
    display: none;
  }

  &:focus + button {
    display: block;
  }

  &+button: active {
    display: block;
  }
`;

const CommentForm = memo(() => {
  const [comment, setComment] = useState('');

  const onChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <StyledCommentFormDiv>
      <form>
        <StyledTextarea
          className='comment_form_textarea'
          onChange={onChange}
          value={comment}
          rows={1}
          placeholder='댓글 달기...'
        />
        <Button htmlType='submit' onClick={onSubmit}>
          <p>게시</p>
        </Button>
      </form>
    </StyledCommentFormDiv>
  );
});

export default CommentForm;
