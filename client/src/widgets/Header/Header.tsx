import { NavLink } from 'react-router';

import { useAppSelector } from '../../shared/hooks/reduxHooks';
import UserPanel from './UserPanel/UserPanel';

import styles from './Header.module.css';

function Header() {
  const { token } = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <NavLink to={'/'} className={styles.logo}>
        Express-shop
      </NavLink>

      {!token ? (
        <div className={styles.actions}>
          <NavLink to={'/login'}>SignIn</NavLink>
          <NavLink to={'/registration'}>SignUp</NavLink>
        </div>
      ) : (
        <UserPanel />
      )}
    </header>
  );
}

export default Header;
