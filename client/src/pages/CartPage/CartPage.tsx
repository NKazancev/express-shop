import CartProductsList from '@widgets/Cart/CartProductsList/CartProductsList';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import CartTotal from '@widgets/Cart/CartTotal/CartTotal';

import styles from './CartPage.module.css';

const CartPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();

  return (
    <div className={styles.container}>
      <CartProductsList items={cartProducts} />
      <CartTotal items={cartProducts} />
    </div>
  );
};

export default CartPage;
