import { NavLink } from 'react-router';

import userRoutes from '@config/userRoutes';

import styles from './UserNavigation.module.css';

const UserNavigation = () => {
  const linksList = (
    <ul className={styles.list}>
      {userRoutes.map((link) => {
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

export default UserNavigation;
