import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledCommentFormDiv = styled.div`
  display: flex;
  margin: 0.5rem 1rem;

  & form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;
  flex-basis: 90%;
  border: none;

  &:focus {
    outline: none;
  }

  & + button {
    display: none;
  }

  &:focus + button {
    display: inline-block;
    border: none;
    flex-basis: 10%;
    font-size: 0.8rem;

    &:hover {
      outline: 1px dotted black;
    }
  }

  &+button: active {
    display: inline-block;
    border: 1px solid black;
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
        <Button htmlType='submit' onClick={onSubmit} type='primary' block>
          <p>게시</p>
        </Button>
      </form>
    </StyledCommentFormDiv>
  );
});

export default CommentForm;
