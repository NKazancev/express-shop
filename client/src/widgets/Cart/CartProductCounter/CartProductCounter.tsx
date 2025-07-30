import { FC } from 'react';
import toast from 'react-hot-toast';

import baseApi from '@config/baseApi';

import { useUpdateCartProductMutation } from '@shared/api/cartApi';
import { useAppDispatch } from '@shared/hooks/reduxHooks';

import styles from './CartProductCounter.module.css';

type TCartProductCounter = {
  id: string;
  quantity: number;
};

const CartProductCounter: FC<TCartProductCounter> = ({ id, quantity }) => {
  const [updateCartProduct] = useUpdateCartProductMutation();
  const dispatch = useAppDispatch();

  const increaseQuantity = async () => {
    try {
      if (quantity) {
        await updateCartProduct({ id, quantity: quantity + 1 }).unwrap();
        dispatch(baseApi.util.invalidateTags(['Users']));
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  const decreaseQuantity = async () => {
    try {
      if (quantity) {
        await updateCartProduct({ id, quantity: quantity - 1 }).unwrap();
        dispatch(baseApi.util.invalidateTags(['Users']));
      }
    } catch (error) {
      toast.error('Something went wrong');
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
