import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from './common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, CLEAR_RECOMMENT } from '../reducers/post';

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

const CommentForm = memo(({ postId }) => {
  const dispatch = useDispatch();
  const { recommentId, mentionedUser, commentPostId } = useSelector(
    (state) => state.post,
  );
  const [comment, setComment] = useState('');

  const commentRef = useRef();

  useEffect(() => {
    if (mentionedUser && recommentId) {
      setComment(`@${mentionedUser} `);
      commentRef.current && commentRef.current.focus();
    }
  }, [mentionedUser, recommentId, commentPostId]);

  useEffect(() => {
    return () => {
      dispatch({
        type: CLEAR_RECOMMENT,
      });
    };
  }, []);

  const onChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          content: comment,
          postId: postId || null,
          recommentId: recommentId || null,
        },
      });
    },
    [comment],
  );

  return (
    <StyledCommentFormDiv>
      <div style={{ display: 'flex', width: '100%' }}>
        <form>
          <StyledTextarea
            name={postId}
            className='comment_form_textarea'
            ref={postId === commentPostId ? commentRef : null}
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
