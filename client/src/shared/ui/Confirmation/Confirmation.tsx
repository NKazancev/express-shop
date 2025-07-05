import { FC } from 'react';

import Modal from '../Modal/Modal';

import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import styles from './Confirmation.module.css';

type TConfirmation = {
  text: string;
  onAgree: () => void;
  onClose: () => void;
};

const Confirmation: FC<TConfirmation> = (props) => {
  const { text, onAgree, onClose } = props;

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>

        <div className={styles.buttons}>
          <button onClick={onAgree} className={styles.buttonAgree}>
            Yes
          </button>
          <button onClick={onClose} className={styles.buttonDisagree}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default Confirmation;
