import { FC } from 'react';

import { STATIC_URL } from '@config/consts';
import { ICartProduct } from '@shared/models/cart';
import { useDeleteCartProductMutation } from '@shared/api/cartApi';
import CartProductCounter from '../CartProductCounter/CartProductCounter';

import xbutton from '@shared/assets/x-button.svg';
import styles from './CartProduct.module.css';

type TCartProduct = ICartProduct & { index: number };

const CartProduct: FC<TCartProduct> = ({ index, id, product, quantity }) => {
  const [deleteCartProduct] = useDeleteCartProductMutation();

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

      <h5 className={styles.name}>{product.name}</h5>

      <CartProductCounter id={id} quantity={quantity} />

      <div className={styles.price}>{quantity * product.price}</div>

      <button type="button" onClick={removeProduct}>
        <img src={xbutton} alt="delete-icon" width={12} />
      </button>
    </li>
  );
};

export default CartProduct;
