import { useState } from 'react';
import { NavLink } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import ModalLogin from '../../modals/ModalLogin';
import UserPanel from './UserPanel/UserPanel';

import styles from './Header.module.css';

function Header() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <h1 className={styles.logo}>
          <span className={styles.span}>Express</span> shop
        </h1>
      </NavLink>

      {!isLogged ? (
        <div className={styles.actions}>
          <button type="button" onClick={showModal} className={styles.button}>
            Sign in
          </button>

          <NavLink to={'/registration'}>Sign up</NavLink>
        </div>
      ) : (
        <UserPanel />
      )}

      {modalVisible && <ModalLogin onClose={hideModal} />}
    </header>
  );
}

export default Header;
