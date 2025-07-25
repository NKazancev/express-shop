import { FC, useEffect, useState } from 'react';

import { PORTAL_CONTAINER_ID } from '@config/consts';
import UpdateProductInfo from '@processes/UpdateProductInfo';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUpdateProductInfo.module.css';

type TModalUpdateProduct = {
  onClose: () => void;
  productId: string;
};

const ModalUpdateProduct: FC<TModalUpdateProduct> = (props) => {
  const { onClose, productId } = props;

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Update info</h3>

        <UpdateProductInfo productId={productId} setIsSuccess={setIsSuccess} />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalUpdateProduct;
