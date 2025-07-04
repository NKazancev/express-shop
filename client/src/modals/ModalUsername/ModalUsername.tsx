import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useChangeUsernameMutation } from '@shared/api/userApi';
import { IUser } from '@shared/models/user';
import ChangeUsernameForm from '@widgets/User/UserInfo/ChangeUsernameForm/ChangeUsernameForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUsername.module.css';

type TModalUsername = {
  onClose: () => void;
};

const ModalUsername: FC<TModalUsername> = ({ onClose }) => {
  const [changeUsername, { isSuccess }] = useChangeUsernameMutation();
  const [error, setError] = useState<string>();

  const handleUsernameChange = async (data: Pick<IUser, 'username'>) => {
    try {
      await changeUsername({ ...data }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Change username</h3>

        <ChangeUsernameForm
          onUsernameChange={handleUsernameChange}
          apiError={error}
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

export default ModalUsername;
