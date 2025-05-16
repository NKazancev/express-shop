import { FC } from 'react';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import styles from './ModalImage.module.css';

type TModalImage = {
  onClose: () => void;
  imageUrl?: string;
};

const ModalImage: FC<TModalImage> = ({ onClose, imageUrl }) => {
  const content = (
    <Modal onClose={onClose}>
      <div className={styles.image}>
        <img src={imageUrl} alt="image" />
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalImage;
