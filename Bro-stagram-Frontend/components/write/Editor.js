import React, { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, SET_OFF_MODAL } from '../../reducers/post';

const Responsive = styled.div`
  background: white;

  @media (min-width: 736px) {
    width: 480px;
  }
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stratch;
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;

  .editor_title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }

  & .editor_textarea_wrapper {
  }

  & .editor_textarea {
    width: 100%;
    height: 100%;
  }

  .editor_buttons_wrapper {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .editor_buttons_containter {
    flex: 1 0 0%;
  }
`;

const EditorButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
  }
`;

const Editor = memo(({ cancle, isAdded }) => {
  const dispatch = useDispatch();
  // const { isAddingPost, isPostAdded } = useSelector(state => state.post);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (isAdded) {
      setImages([]);
      setText('');

      dispatch({
        type: SET_OFF_MODAL,
      });
    }
  }, [isAdded]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text,
        image: images,
      },
    });
  });

  return (
    <Responsive>
      <EditorWrapper>
        <div className='editor_title'>게시하기</div>
        <div>
          <ImageUpload images={images} setImages={setImages} />
        </div>
        <div className='editor_textarea_wrapper'>
          <textarea className='editor_textarea' onChange={onChangeText} />
        </div>
        <div className='editor_buttons_wrapper'>
          <div className='editor_buttons_container'>
            <EditorButton
              className='editor_buttons_item'
              onClick={onSubmit}
              cyan
            >
              Submit
            </EditorButton>
            <EditorButton className='editor_buttons_item' onClick={cancle}>
              Cancle
            </EditorButton>
          </div>
        </div>
      </EditorWrapper>
    </Responsive>
  );
});

export default Editor;
