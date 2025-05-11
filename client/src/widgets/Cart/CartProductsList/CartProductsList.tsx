import { FC } from 'react';

import CartProduct from '../CartProduct/CartProduct';
import { ICartProduct } from '@shared/models/cart';

import styles from './CartProductsList.module.css';

type TCartProductsList = {
  items?: ICartProduct[];
};

const CartProductsList: FC<TCartProductsList> = ({ items }) => {
  const cartProductsList = items?.map((cartProduct, index) => {
    return (
      <CartProduct
        index={index}
        key={cartProduct.id}
        id={cartProduct.id}
        quantity={cartProduct.quantity}
        product={cartProduct.product}
      />
    );
  });

  return <ul className={styles.list}>{cartProductsList}</ul>;
};

export default CartProductsList;
