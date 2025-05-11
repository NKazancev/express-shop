import { FC } from 'react';

import { STATIC_URL } from '@config/consts';
import { ICartProduct } from '@shared/models/cart';
import {
  useDeleteCartProductMutation,
  useUpdateCartProductMutation,
} from '@shared/api/cartApi';

import deleteIcon from '@shared/assets/delete-icon.svg';
import styles from './CartProduct.module.css';

type TCartProduct = ICartProduct & { index: number };

const CartProduct: FC<TCartProduct> = ({ index, id, product, quantity }) => {
  const [updateCartProduct] = useUpdateCartProductMutation();
  const [deleteCartProduct] = useDeleteCartProductMutation();

  const increaseQuantity = async () => {
    try {
      await updateCartProduct({ id, quantity: quantity + 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async () => {
    try {
      await updateCartProduct({ id, quantity: quantity - 1 }).unwrap();
      if (quantity === 1) await deleteCartProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async () => {
    try {
      await deleteCartProduct(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.index}>{index + 1}.</div>

      <div className={styles.image}>
        <img src={`${STATIC_URL}/${product.image}`} alt="image" />
      </div>

      <div className={styles.name}>{product.name}</div>

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
        >
          <span>-</span>
        </button>
      </div>

      <div className={styles.price}>{quantity * product.price}</div>

      <button type="button" onClick={removeProduct}>
        <img src={deleteIcon} alt="delete-icon" />
      </button>
    </li>
  );
};

export default CartProduct;
