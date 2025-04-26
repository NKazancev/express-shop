import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { useLogoutMutation } from '@shared/api/authApi';

import styles from './UserPanel.module.css';

const UserPanel = () => {
  const { role } = useAppSelector((state) => state.user);
  const { data } = useGetCartProductsQuery();
  const [dataQuantity, setDataQuantity] = useState<number | undefined>(0);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setDataQuantity(data?.reduce((acc, el) => (acc += el.quantity), 0));
  }, [data]);

  const handleLogout = () => logout();

  return (
    <div className={styles.container}>
      {role === 'ADMIN' && <NavLink to="/admin">Admin panel</NavLink>}
      {role === 'USER' && <NavLink to="/cart">Cart({dataQuantity})</NavLink>}

      <button type="button" onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};
export default UserPanel;
