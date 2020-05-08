import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/common/Modal';
import Editor from '../components/write/Editor';
import { SET_OFF_MODAL } from '../reducers/post';

const PostEditor = memo(() => {
  const { onModal, isPostAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const closeEditor = useCallback(() => {
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);

  return onModal ? (
    <Modal>
      <Editor cancle={closeEditor} isAdded={isPostAdded} />
    </Modal>
  ) : null;
});

export default PostEditor;
