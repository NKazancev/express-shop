import { NavLink } from 'react-router';

import { adminNavigation } from '@config/navigation';

import styles from './AdminNavigation.module.css';

const AdminNavigation = () => {
  const linksList = (
    <ul className={styles.list}>
      {adminNavigation.map((link) => {
        return (
          <li key={link.id}>
            <NavLink
              to={link.path}
              end={link.end}
              className={({ isActive, isPending }) =>
                isActive ? styles.active : isPending ? styles.pending : ''
              }
            >
              {link.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return <nav className={styles.navigation}>{linksList}</nav>;
};

export default AdminNavigation;
