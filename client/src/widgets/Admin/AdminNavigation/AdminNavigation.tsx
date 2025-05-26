import { NavLink } from 'react-router';

import styles from './AdminNavigation.module.css';

const AdminNavigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive, isPending }) =>
              isActive ? styles.active : isPending ? styles.pending : ''
            }
          >
            Add product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="products"
            className={({ isActive, isPending }) =>
              isActive ? styles.active : isPending ? styles.pending : ''
            }
          >
            Products list
          </NavLink>
        </li>
        <li>
          <NavLink
            to="orders"
            className={({ isActive, isPending }) =>
              isActive ? styles.active : isPending ? styles.pending : ''
            }
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="typesbrands"
            className={({ isActive, isPending }) =>
              isActive ? styles.active : isPending ? styles.pending : ''
            }
          >
            Types/brands
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
