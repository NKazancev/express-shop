import { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { useGetUserQuery } from '@shared/api/userApi';
import useCartTotal from '@shared/hooks/useCartTotal';

import Dropdown from '@shared/ui/Dropdown/Dropdown';
import ProfileMenu from './ProfileMenu/ProfileMenu';

import cart from '@shared/assets/cart-icon.svg';
import profile from '@shared/assets/profile-icon.svg';
import styles from './UserPanel.module.css';

const UserPanel = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { itemsQuantity } = useCartTotal(cartProducts);

  const { data: user } = useGetUserQuery();
  const [profileMenuVisible, setProfileMenuVisible] = useState<boolean>(false);

  const toggleMenu = () => setProfileMenuVisible((prev) => !prev);
  const closeMenu = () => setProfileMenuVisible(false);

  const handleCartClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (itemsQuantity === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <NavLink to="/cart" onClick={handleCartClick} className={styles.cart}>
        <img src={cart} alt="cart-icon" />
        <span>Cart</span>

        {itemsQuantity && itemsQuantity > 0 ? (
          <div className={styles.counter}>{itemsQuantity}</div>
        ) : null}
      </NavLink>

      <div className={styles.profile}>
        <button type="button" onClick={toggleMenu}>
          <img src={profile} alt="profile-icon" />
          <span>{user?.username}</span>
        </button>

        <Dropdown isVisible={profileMenuVisible} onClose={closeMenu}>
          <ProfileMenu />
        </Dropdown>
      </div>
    </div>
  );
};
export default UserPanel;
