import ReactDOM from 'react-dom';
import { memo } from 'react';

const ModalPortal = ({ children }) => {
  // let container;
  // if (typeof window !== undefined) {
  //   const rootContainer = document.createElement('div');
  //   const rootElement = document.querySelector('#__next');
  //   const parentElement = rootElement.parentElement;
  //   parentElement.appendChild(rootContainer);
  //   container = rootContainer;
  // }
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(children, el);
};

export default memo(ModalPortal);
