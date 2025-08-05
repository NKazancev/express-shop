import { useLogoutMutation } from '@shared/api/authApi';
import { NavLink } from 'react-router';

import styles from './ProfileMenu.module.css';

const DropdownProfile = () => {
  const [logout] = useLogoutMutation();
  const handleLogout = () => logout();

  return (
    <ul className={styles.profileMenu}>
      <li>
        <NavLink to="/user" className={styles.button}>
          Profile
        </NavLink>
      </li>
      <li>
        <button type="button" onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      </li>
    </ul>
  );
};

export default DropdownProfile;
