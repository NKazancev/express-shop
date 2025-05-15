import { NavLink } from 'react-router';

import styles from './AdminNavigation.module.css';

const AdminNavigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/admin">Handle products</NavLink>
        </li>
        <li>
          <NavLink to="create">Create product</NavLink>
        </li>
        <li>
          <NavLink to="types">Handle types</NavLink>
        </li>
        <li>
          <NavLink to="brands">Handle brands</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
