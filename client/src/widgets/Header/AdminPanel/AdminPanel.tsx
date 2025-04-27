import { NavLink } from 'react-router';

import { useLogoutMutation } from '@shared/api/authApi';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const [logout] = useLogoutMutation();
  const handleLogout = () => logout();

  return (
    <div className={styles.container}>
      <NavLink to="/admin">Admin panel</NavLink>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
