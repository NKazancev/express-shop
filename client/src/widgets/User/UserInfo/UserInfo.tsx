import { FC, useState } from 'react';
import { TUserInfo } from '@shared/models/user';

import ModalPassword from '@modals/ModalPassword/ModalPassword';
import ModalUsername from '@modals/ModalUsername/ModalUsername';

import UserAddress from './UserAddress/UserAddress';

import pen from '@shared/assets/pen-icon.svg';
import styles from './UserInfo.module.css';

const UserInfo: FC<TUserInfo> = ({ email, username, stringAddress }) => {
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalUsername, setModalUsername] = useState<boolean>(false);

  const password = new Array(9)
    .fill(null)
    .map((_, i) => <li key={i} className={styles.circle} />);

  const showPassword = () => setModalPassword(true);
  const hidePassword = () => setModalPassword(false);
  const showUsername = () => setModalUsername(true);
  const hideUsername = () => setModalUsername(false);

  return (
    <ul className={styles.info}>
      <li className={styles.row}>
        <span>Email:</span>
        <span className={styles.email}>{email}</span>
      </li>

      <li className={styles.row}>
        <span>Password:</span>
        <ul className={styles.password}>{password}</ul>
        <button type="button" onClick={showPassword} className={styles.button}>
          <img src={pen} alt="pen" width={12} />
          <span>change password</span>
        </button>
      </li>

      <li className={styles.row}>
        <span>Username:</span>
        <span className={styles.username}>{username}</span>
        <button type="button" onClick={showUsername} className={styles.button}>
          <img src={pen} alt="pen" width={12} />
          <span>change username</span>
        </button>
      </li>

      <li className={styles.row}>
        <span>Delivery address:</span>
        {stringAddress && <UserAddress stringAddress={stringAddress} />}
      </li>

      {modalPassword && <ModalPassword onClose={hidePassword} />}
      {modalUsername && <ModalUsername onClose={hideUsername} />}
    </ul>
  );
};

export default UserInfo;
