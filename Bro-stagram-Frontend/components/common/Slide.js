import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Images from './Images';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ON_MODAL } from '../../reducers/post';

const Img = styled.img`
  display: block;
  width: auto;
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

  return (
    <>
      <Img onClick={onImages} src={img} />
      {onModal ? <Images images={img} /> : null}
    </>
  );
};

export default Slide;
