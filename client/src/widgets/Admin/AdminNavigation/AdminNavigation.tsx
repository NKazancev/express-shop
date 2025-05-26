import { NavLink } from 'react-router';

import styles from './AdminNavigation.module.css';

const AdminNavigation = () => {
  const linksData = [
    { id: 1, path: '/admin', name: 'Add product', end: true },
    { id: 2, path: 'products', name: 'Products list' },
    { id: 3, path: 'orders', name: 'Orders' },
    { id: 4, path: 'typesbrands', name: 'Types/brands' },
  ];

  const linksList = (
    <ul className={styles.list}>
      {linksData.map((link) => {
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
