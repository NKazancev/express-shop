import { FC, useEffect } from 'react';
import { NavLink } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import LoginUser from '@processes/LoginUser';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalLogin.module.css';

type TModalLogin = {
  onClose: () => void;
};

const ModalLogin: FC<TModalLogin> = ({ onClose }) => {
  const { isLogged } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isLogged) onClose();
  }, [isLogged]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Sign in</h3>

        <LoginUser />

        <p className={styles.text}>
          <span>Don’t have an account?</span>{' '}
          <NavLink to={'/registration'} onClick={onClose}>
            Register here
          </NavLink>
        </p>

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalLogin;
