import { FC, useEffect, useState } from 'react';

import { PORTAL_CONTAINER_ID } from '@config/consts';
import UpdateProductGallery from '@processes/UpdateProductGallery';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUpdateProductGallery.module.css';

type TModalGallery = {
  onClose: () => void;
  productId: string;
};

const ModalUpdateProductGallery: FC<TModalGallery> = (props) => {
  const { onClose, productId } = props;

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Update gallery</h3>

        <UpdateProductGallery
          productId={productId}
          setIsSuccess={setIsSuccess}
        />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalUpdateProductGallery;
