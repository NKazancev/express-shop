import { FC, useEffect, useState } from 'react';

import { PORTAL_CONTAINER_ID } from '@config/consts';
import ChangeUsername from '@processes/User/ChangeUsername';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUsername.module.css';

type TModalUsername = {
  onClose: () => void;
};

const ModalUsername: FC<TModalUsername> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Change username</h3>

        <ChangeUsername setIsSuccess={setIsSuccess} />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalUsername;
