import { FC } from 'react';

import Modal from '@shared/ui/Modal/Modal';

import styles from './ModalImage.module.css';

type TModalImage = {
  onClose: () => void;
  imageUrl?: string;
};

const ModalImage: FC<TModalImage> = ({ onClose, imageUrl }) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.image}>
        <img src={imageUrl} alt="image" />
      </div>
    </Modal>
  );
};

export default ModalImage;
