import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Slider from './Slider';

const Images = ({ images }) => {
  return (
    <Modal>
      <img src={images} />
      {/* {images.map((v, i) => (
        <img key={`${v}${i}`} src={v} />
      ))} */}
    </Modal>
  );
};

export default Images;
