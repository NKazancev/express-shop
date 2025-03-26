import { NavLink } from 'react-router';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to={'/'} className={styles.logo}>
        Express-shop
      </NavLink>

      <div className={styles.actions}>
        <NavLink to={'/login'}>SignIn</NavLink>
        <NavLink to={'/registration'}>SignUp</NavLink>
      </div>
    </header>
  );
}

export default Header;
