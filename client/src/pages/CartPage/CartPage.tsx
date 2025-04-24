import CartProductsList from '@widgets/Cart/CartProductsList/CartProductsList';

import styles from './CartPage.module.css';

const CartPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cart page</h2>
      <CartProductsList />
    </div>
  );
};

export default CartPage;
