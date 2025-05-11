import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import CartProductsList from '@widgets/Cart/CartProductsList/CartProductsList';
import CartTotal from '@widgets/Cart/CartTotal/CartTotal';

import styles from './CartPage.module.css';

const CartPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts?.length === 0) {
      navigate('/');
    }
  }, [cartProducts, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <CartProductsList items={cartProducts} />
      </div>

      <div className={styles.total}>
        <CartTotal items={cartProducts} />
      </div>
    </div>
  );
};

export default CartPage;
