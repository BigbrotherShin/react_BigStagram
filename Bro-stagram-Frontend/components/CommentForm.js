import React, { memo, useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from './common/Button';

const StyledCommentFormDiv = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 4px;
  margin-bottom: 4px;

  & form {
    display: flex;
    flex-grow: 1;
    align-items: center;
    width: 100%;
    height: 20px;
    justify-content: space-between;
    overflow: auto;
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;
  flex-grow: 1;
  width: 100%;
  font-size: 1rem;
  border: none;
  height: 24px;
  max-height: 80px;

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

const CommentButton = styled(Button)`
  ${(props) =>
    !props.text &&
    css`
      opacity: 0.3;
    `}
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
      <div style={{ display: 'flex', width: '100%' }}>
        <form>
          <StyledTextarea
            className='comment_form_textarea'
            onChange={onChange}
            value={comment}
            rows={1}
            placeholder='댓글 달기...'
          />
          <CommentButton htmlType='submit' onClick={onSubmit} text={comment}>
            <p>게시</p>
          </CommentButton>
        </form>
      </div>
    </StyledCommentFormDiv>
  );
});

export default CommentForm;
