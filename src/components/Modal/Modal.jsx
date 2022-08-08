import React from 'react';
import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const ModalView = ({ changeURL, onClose, findCurrentIndex, largeImageURL }) => {
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.addEventListener('keyup', onKeyUp);
    findCurrentIndex();
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  });

  const onKeyUp = event => {
    if (event.code === 'ArrowLeft') {
      changeURL(-1);
      return;
    }
    if (event.code === 'ArrowRight') {
      changeURL(1);
      return;
    }
    if (event.code === 'Escape') {
      onClose();
      return;
    }
  };

  const handleBackDrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDrop}>
      <Modal>
        <img src={largeImageURL} alt="" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

export default ModalView;
