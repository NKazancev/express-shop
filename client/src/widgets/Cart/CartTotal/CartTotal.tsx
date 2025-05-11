import { FC } from 'react';

import { ICartProduct } from '@shared/models/cart';

import styles from './CartTotal.module.css';

type TCartTotal = {
  items?: ICartProduct[];
};

const CartTotal: FC<TCartTotal> = ({ items }) => {
  const total = items?.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Cart totals</h5>

      <div className={styles.quantity}>
        <span>Items quantity</span>
        <span>{items?.length}</span>
      </div>

      <div className={styles.total}>
        <span>Total</span>
        <span>&#8381; {total}</span>
      </div>

      <button type="button" className={styles.button}>
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
