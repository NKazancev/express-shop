import { FC } from 'react';

import { STATIC_URL } from '@config/consts';
import DeleteCartProduct from '@processes/DeleteCartProduct';

import { ICartProduct } from '@shared/models/cart';

import CartProductCounter from '../CartProductCounter/CartProductCounter';

import styles from './CartProduct.module.css';

type TCartProduct = ICartProduct & { index: number };

const CartProduct: FC<TCartProduct> = ({ index, id, product, quantity }) => {
  return (
    <li className={styles.item}>
      <div className={styles.index}>{index + 1}.</div>

      <div className={styles.image}>
        <img src={`${STATIC_URL}/${product.image}`} alt="image" />
      </div>

      <h5 className={styles.name}>{product.name}</h5>

      <CartProductCounter id={id} quantity={quantity} />

      <div className={styles.price}>{quantity * product.price}</div>

      <DeleteCartProduct productId={id} />
    </li>
  );
};

export default CartProduct;
