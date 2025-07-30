import { FC } from 'react';
import { useNavigate } from 'react-router';

import { ICartProduct } from '@shared/models/cart';
import { useCartItemsCount, useCartTotalPrice } from '@shared/hooks/useCart';

import styles from './CartTotal.module.css';

type TCartTotal = {
  items: ICartProduct[];
};

const CartTotal: FC<TCartTotal> = ({ items }) => {
  const navigate = useNavigate();

  const itemsQuantity = useCartItemsCount(items);
  const totalPrice = useCartTotalPrice(items);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Cart totals</h5>

      <div className={styles.quantity}>
        <span>Items quantity</span>
        <span>{itemsQuantity}</span>
      </div>

      <div className={styles.total}>
        <span>Total</span>
        <span>&#8381; {totalPrice}</span>
      </div>

      <button
        type="button"
        onClick={() => navigate('checkout')}
        className={styles.button}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
