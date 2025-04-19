import { NavLink } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import UserPanel from './UserPanel/UserPanel';

import styles from './Header.module.css';

function Header() {
  const { isLogged } = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <h1 className={styles.logo}>
          <span className={styles.span}>Express</span> shop
        </h1>
      </NavLink>

      {!isLogged ? (
        <div className={styles.actions}>
          <NavLink to={'/login'}>Sign in</NavLink>
          <NavLink to={'/registration'}>Sign up</NavLink>
        </div>
      ) : (
        <UserPanel />
      )}
    </header>
  );
}

export default Header;
