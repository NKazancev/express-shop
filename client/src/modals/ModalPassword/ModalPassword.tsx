import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useChangePasswordMutation } from '@shared/api/userApi';
import { IPasswordData } from '@shared/models/user';
import ChangePasswordForm from '@widgets/User/UserInfo/ChangePasswordForm/ChangePasswordForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalPassword.module.css';

type TModalPassword = {
  onClose: () => void;
};

const ModalPassword: FC<TModalPassword> = ({ onClose }) => {
  const [changePassword, { isSuccess }] = useChangePasswordMutation();
  const [error, setError] = useState<string>();

  const handlePasswordChange = async (data: IPasswordData) => {
    try {
      await changePassword({ ...data }).unwrap();
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
        <h3 className={styles.title}>Change password</h3>

        <ChangePasswordForm
          onPasswordChange={handlePasswordChange}
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

export default ModalPassword;
