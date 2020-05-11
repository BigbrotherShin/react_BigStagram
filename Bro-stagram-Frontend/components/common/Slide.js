import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Images from './Images';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ON_MODAL } from '../../reducers/post';

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  flex-shrink: 0;
`;

const Slide = ({ img }) => {
  const { onModal } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onImages = useCallback(() => {
    dispatch({
      type: SET_ON_MODAL,
    });
  }, []);

  // 일단은 이미지 확대 기능 없이 진행(2020.5.9)
  return <Img src={`http://localhost:3065/${img}`} />;
};

export default Slide;
