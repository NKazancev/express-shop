import { useState } from 'react';
import { NavLink } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import UserPanel from './UserPanel/UserPanel';
import AdminPanel from './AdminPanel/AdminPanel';
import ModalLogin from '../../modals/ModalLogin';

import styles from './Header.module.css';

function Header() {
  const { isLogged, role } = useAppSelector((state) => state.user);
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

      {!isLogged && (
        <div className={styles.actions}>
          <button type="button" onClick={showModal}>
            Sign in
          </button>
          <NavLink to={'/registration'}>Sign up</NavLink>
        </div>
      )}

      {isLogged && role === 'USER' && <UserPanel />}
      {isLogged && role == 'ADMIN' && <AdminPanel />}

      {modalVisible && <ModalLogin onClose={hideModal} />}
    </header>
  );
}

export default Header;
