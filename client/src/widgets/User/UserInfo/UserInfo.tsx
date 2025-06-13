import { FC, useState } from 'react';
import { IUser } from '@shared/models/user';

import ModalPassword from '@modals/ModalPassword/ModalPassword';

import pen from '@shared/assets/pen-icon.svg';
import styles from './UserInfo.module.css';

const UserInfo: FC<IUser> = ({ email }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const password = new Array(9)
    .fill(null)
    .map((_, i) => <span key={i} className={styles.circle} />);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <div className={styles.info}>
      <div className={styles.row}>
        <span>Email:</span>
        <span className={styles.email}>{email}</span>
      </div>

      <div className={styles.row}>
        <span>Password:</span>
        <ul className={styles.password}>{password}</ul>

        <button type="button" onClick={showModal} className={styles.button}>
          <img src={pen} alt="pen" width={12} />
          <span>change password</span>
        </button>
      </div>

      {modalVisible && <ModalPassword onClose={hideModal} />}
    </div>
  );
};

export default UserInfo;
