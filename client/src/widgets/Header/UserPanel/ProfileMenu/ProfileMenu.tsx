import { useLogoutMutation } from '@shared/api/authApi';
import styles from './ProfileMenu.module.css';

const DropdownProfile = () => {
  const [logout] = useLogoutMutation();
  const handleLogout = () => logout();

  return (
    <ul className={styles.profileMenu}>
      <li>Profile</li>
      <li>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  );
};

export default DropdownProfile;
