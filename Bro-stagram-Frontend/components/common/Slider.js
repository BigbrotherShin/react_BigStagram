import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import Slide from './Slide';
import palette from '../../lib/styles/palette';

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  transform: translateX(-100%);

  ${(props) =>
    props.forPost &&
    css`
      height: 360px;
    `}
`;

// const ArrowContainer = styled.div`
//   display: flex;
//   height: 100%;
//   width: 100%;
//   justify-content: space-between;
//   position: absolute;
//   top: 0;
//   left: 0;

//   & button {
//     background: none;
//     border: none;
//     color: #efefef;
//     cursor: pointer;

//     &:focus {
//       outline: none;
//     }
//   }
// `;

const ArrowButton = styled.button`
  position: absolute;
  display: inline-block;
  height: 100%;
  background: none;
  border: none;
  color: #efefef;
  cursor: pointer;
  top: 0;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.left &&
    css`
      left: 0;
    `}

  ${(props) =>
    props.right &&
    css`
      right: 0;
    `}
`;

const PagenationContainer = styled.ul`
  display: flex;
  position: absolute;
  justify-content: center;
  bottom: 0;
  width: 100%;
`;

const PagenationDotContainer = styled.li`
  & + & {
    margin-left: 10px;
  }
`;

const PagenationDot = styled.span`
  display: inline-block;
  height: 14px;
  width: 14px;
  background: ${palette.gray[4]};
  border-radius: 50%;

  ${(props) =>
    props.idx === props.currentSlide &&
    css`
      background: ${palette.gray[7]};
    `}
`;

const aniTime = 500;

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pagenationSlide, setPagenationSlide] = useState(0);
  const slideRef = useRef(null);

  const goToSlide = useCallback(() => {
    slideRef.current.style.transition = 'none';
    slideRef.current.style.transform = `translateX(-100%)`;
    setCurrentSlide(0);
  }, []);

  const goToLastSlide = useCallback(() => {
    slideRef.current.style.transition = 'none';
    slideRef.current.style.transform = `translateX(-${images.length}00%)`;
    setCurrentSlide(images.length - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setPagenationSlide((prevState) => prevState + 1);
    setCurrentSlide((prevState) => prevState + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setPagenationSlide((prevState) => prevState - 1);
    setCurrentSlide((prevState) => prevState - 1);
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = `all ${aniTime}ms ease-in-out`;
    slideRef.current.style.transform = `translateX(${
      -1 * (currentSlide + 1) * 100
    }%)`;

    if (currentSlide === images.length) {
      setPagenationSlide(0);
      setTimeout(goToSlide, aniTime);
    } else if (currentSlide === -1) {
      setPagenationSlide(images.length - 1);
      setTimeout(goToLastSlide, aniTime);
    }
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer forPost ref={slideRef}>
        <Slide img={images[images.length - 1]} />
        {images.map((v, i) => (
          <Slide img={v} />
        ))}
        <Slide img={images[0]} />
      </SliderContainer>
      {/* <ArrowContainer>
        <button onClick={prevSlide}>
          <CaretLeftOutlined />
        </button>
        <button onClick={nextSlide}>
          <CaretRightOutlined />
        </button>
      </ArrowContainer> */}
      <ArrowButton left onClick={prevSlide}>
        <CaretLeftOutlined />
      </ArrowButton>
      <ArrowButton right onClick={nextSlide}>
        <CaretRightOutlined />
      </ArrowButton>
      <PagenationContainer>
        {images.length > 1
          ? images.map((v, i) => (
              <PagenationDotContainer key={`${v} ${i}`}>
                <PagenationDot
                  idx={i}
                  currentSlide={pagenationSlide}
                ></PagenationDot>
              </PagenationDotContainer>
            ))
          : null}
      </PagenationContainer>
    </Container>
  );
};

export default Slider;
