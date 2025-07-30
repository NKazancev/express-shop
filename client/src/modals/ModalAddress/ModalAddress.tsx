import { FC, useEffect, useState } from 'react';

import { PORTAL_CONTAINER_ID } from '@config/consts';
import HandleAddress from '@processes/HandleAddress';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalAddress.module.css';

type TModalAddress = {
  isUpdate: boolean;
  onClose: () => void;
};

const ModalAddress: FC<TModalAddress> = ({ onClose, isUpdate }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {!isUpdate ? 'Add address' : 'Update address'}
        </h3>

        <HandleAddress isUpdate={isUpdate} setIsSuccess={setIsSuccess} />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalAddress;
