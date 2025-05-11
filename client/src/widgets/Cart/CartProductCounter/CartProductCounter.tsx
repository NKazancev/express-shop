import { FC } from 'react';

import { useUpdateCartProductMutation } from '@shared/api/cartApi';

import styles from './CartProductCounter.module.css';

type TCartProductCounter = {
  id: string;
  quantity?: number;
};

const CartProductCounter: FC<TCartProductCounter> = ({ id, quantity }) => {
  const [updateCartProduct] = useUpdateCartProductMutation();

  const increaseQuantity = async () => {
    try {
      if (quantity)
        await updateCartProduct({ id, quantity: quantity + 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async () => {
    try {
      if (quantity)
        await updateCartProduct({ id, quantity: quantity - 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.counter}>
      <button
        type="button"
        className={styles.button}
        onClick={increaseQuantity}
      >
        <span>+</span>
      </button>

      <span className={styles.quantity}>{quantity}</span>

      <button
        type="button"
        className={styles.button}
        onClick={decreaseQuantity}
        disabled={quantity === 1}
      >
        <span>-</span>
      </button>
    </div>
  );
};

export default CartProductCounter;
