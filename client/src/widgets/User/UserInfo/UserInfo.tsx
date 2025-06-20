import { FC, useState } from 'react';
import { IUserInfo } from '@shared/models/user';

import ModalPassword from '@modals/ModalPassword/ModalPassword';
import ModalUsername from '@modals/ModalUsername/ModalUsername';
import ModalAddress from '@modals/ModalAddress/ModalAddress';

import pen from '@shared/assets/pen-icon.svg';
import styles from './UserInfo.module.css';

const UserInfo: FC<IUserInfo> = ({ email, username, stringAddress }) => {
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalUsername, setModalUsername] = useState<boolean>(false);
  const [modalAddress, setModalAddress] = useState<boolean>(false);

  const password = new Array(9)
    .fill(null)
    .map((_, i) => <li key={i} className={styles.circle} />);

  const showPassword = () => setModalPassword(true);
  const hidePassword = () => setModalPassword(false);
  const showUsername = () => setModalUsername(true);
  const hideUsername = () => setModalUsername(false);
  const showAddress = () => setModalAddress(true);
  const hideAddress = () => setModalAddress(false);

  return (
    <div className={styles.info}>
      <div className={styles.row}>
        <span>Email:</span>
        <span className={styles.email}>{email}</span>
      </div>

      <div className={styles.row}>
        <span>Password:</span>
        <ul className={styles.password}>{password}</ul>
        <button type="button" onClick={showPassword} className={styles.button}>
          <img src={pen} alt="pen" width={12} />
          <span>change password</span>
        </button>
      </div>

      <div className={styles.row}>
        <span>Username:</span>
        <span className={styles.username}>{username}</span>
        <button type="button" onClick={showUsername} className={styles.button}>
          <img src={pen} alt="pen" width={12} />
          <span>change username</span>
        </button>
      </div>

      <div className={styles.row}>
        <span>Delivery address:</span>
        {stringAddress ? (
          <span className={styles.username}>{stringAddress}</span>
        ) : (
          <button
            type="button"
            onClick={showAddress}
            className={styles.addressBtn}
          >
            + add delivery address
          </button>
        )}
      </div>

      {modalPassword && <ModalPassword onClose={hidePassword} />}
      {modalUsername && <ModalUsername onClose={hideUsername} />}
      {modalAddress && <ModalAddress onClose={hideAddress} />}
    </div>
  );
};

export default UserInfo;
