import { NavLink } from 'react-router';

import { useLogoutMutation } from '../../../shared/api/authApi';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';

import styles from './UserPanel.module.css';

const UserPanel = () => {
  const { role } = useAppSelector((state) => state.user);
  const [logout] = useLogoutMutation();

  const handleLogout = () => logout();

  return (
    <div className={styles.container}>
      {role === 'ADMIN' && <NavLink to="/admin">Admin panel</NavLink>}
      {role === 'USER' && <NavLink to="/cart">Cart</NavLink>}

      <button type="button" onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};
export default UserPanel;
