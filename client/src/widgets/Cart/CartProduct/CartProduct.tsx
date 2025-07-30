import { FC } from 'react';

import { STATIC_URL } from '@config/consts';
import DeleteCartProduct from '@processes/DeleteCartProduct';

import { ICartProduct } from '@shared/models/cart';

import CartProductCounter from '../CartProductCounter/CartProductCounter';

import styles from './CartProduct.module.css';

const CartProduct: FC<ICartProduct & { index: number }> = (props) => {
  const { index, id, quantity, product } = props;

  const price = product?.price ? quantity * product.price : 0;

  return (
    <li className={styles.item}>
      <div className={styles.index}>{index + 1}.</div>

      <div className={styles.image}>
        <img src={`${STATIC_URL}/${product?.image}`} alt="image" />
      </div>

      <h5 className={styles.name}>{product?.name}</h5>

      <CartProductCounter id={id} quantity={quantity} />

      <div className={styles.price}>{price}</div>

      <DeleteCartProduct productId={id} />
    </li>
  );
};

export default CartProduct;
