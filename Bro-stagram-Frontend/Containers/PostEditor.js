import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Modal from '../components/common/Modal';
import Editor from '../components/write/Editor';
import { SET_OFF_MODAL } from '../reducers/post';
import ModalPortal from '../components/ModalPortal';

const PostEditor = memo(() => {
  const router = useRouter();
  const { onModal, isPostAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const closeEditor = useCallback(() => {
    router.push('/');
    dispatch({
      type: SET_OFF_MODAL,
    });
  }, []);

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_OFF_MODAL,
      });
    };
  }, []);

  return onModal && router.asPath === '/write' ? (
    <ModalPortal>
      <Modal>
        <Editor cancle={closeEditor} isAdded={isPostAdded} />
      </Modal>
    </ModalPortal>
  ) : null;
});

export default PostEditor;
