import { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router';

import { useGetUserCartQuery } from '@shared/api/userApi';
import { useCartItemsCount } from '@shared/hooks/useCart';

import Dropdown from '@shared/ui/Dropdown/Dropdown';
import ProfileMenu from './ProfileMenu/ProfileMenu';

import cart from '@shared/assets/cart-icon.svg';
import profile from '@shared/assets/profile-icon.svg';
import styles from './UserPanel.module.css';

const UserPanel = () => {
  const { data: user } = useGetUserCartQuery();
  const cartItemsCount = useCartItemsCount(user?.cartProducts);

  const [profileMenuVisible, setProfileMenuVisible] = useState<boolean>(false);
  const toggleMenu = () => setProfileMenuVisible((prev) => !prev);
  const closeMenu = () => setProfileMenuVisible(false);

  const handleCartClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (cartItemsCount === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <NavLink to="/cart" onClick={handleCartClick} className={styles.cart}>
        <img src={cart} alt="cart-icon" />
        <span>Cart</span>

        {cartItemsCount && cartItemsCount > 0 ? (
          <div className={styles.counter}>{cartItemsCount}</div>
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
