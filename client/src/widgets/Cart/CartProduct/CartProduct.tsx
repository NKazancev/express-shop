import { FC } from 'react';

import { ICartProduct } from '@shared/models/cart';
import {
  useDeleteCartProductMutation,
  useUpdateCartProductMutation,
} from '@shared/api/cartApi';

import styles from './CartProduct.module.css';

const CartProduct: FC<ICartProduct> = ({ id, product, quantity }) => {
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

  return (
    <li className={styles.item}>
      <div className={styles.name}>{product.name}</div>
      <div>Quantity: {quantity}</div>

      <div className={styles.buttons}>
        <button type="button" onClick={increaseQuantity}>
          +
        </button>
        <button type="button" onClick={decreaseQuantity}>
          -
        </button>
      </div>
    </li>
  );
};

export default CartProduct;
