import { useLogoutMutation } from '../../../shared/api/userApi';

import styles from './UserPanel.module.css';

const UserPanel = () => {
  const [logout] = useLogoutMutation();

  return (
    <button type="button" onClick={logout} className={styles.button}>
      Logout
    </button>
  );
};

export default UserPanel;
