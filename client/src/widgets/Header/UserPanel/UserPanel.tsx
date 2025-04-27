import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import Dropdown from '@shared/ui/Dropdown/Dropdown';
import ProfileMenu from './ProfileMenu/ProfileMenu';

import cart from '@shared/assets/cart-icon.svg';
import profile from '@shared/assets/profile-icon.svg';
import styles from './UserPanel.module.css';

const UserPanel = () => {
  const { data } = useGetCartProductsQuery();
  const [dataQuantity, setDataQuantity] = useState<number>(0);
  const [profileMenuVisible, setProfileMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data)
      setDataQuantity(
        data.reduce((acc: number, el) => (acc += el.quantity), 0)
      );
  }, [data]);

  const toggleMenu = () => setProfileMenuVisible((prev) => !prev);
  const closeMenu = () => setProfileMenuVisible(false);

  return (
    <div className={styles.container}>
      <NavLink to="/cart" className={styles.cart}>
        <img src={cart} alt="cart-icon" />
        <span>Cart</span>

        {dataQuantity > 0 && (
          <div className={styles.counter}>{dataQuantity}</div>
        )}
      </NavLink>

      <div className={styles.profile}>
        <button type="button" onClick={toggleMenu}>
          <img src={profile} alt="profile-icon" />
          <span>Profile</span>
        </button>

        <Dropdown isVisible={profileMenuVisible} onClose={closeMenu}>
          <ProfileMenu />
        </Dropdown>
      </div>
    </div>
  );
};
export default UserPanel;
