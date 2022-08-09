import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const ModalView = ({ changeURL, onClose, findCurrentIndex, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    findCurrentIndex();
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeURL]);  

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
