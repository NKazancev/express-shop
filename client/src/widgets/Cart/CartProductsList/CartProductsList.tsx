import { FC } from 'react';

import CartProduct from '../CartProduct/CartProduct';
import { ICartProduct } from '@shared/models/cart';

import styles from './CartProductsList.module.css';

type CartProductsListProps = {
  items: ICartProduct[];
};

const CartProductsList: FC<CartProductsListProps> = ({ items }) => {
  const cartProductsList = items.map((cartProduct, index) => {
    return (
      <CartProduct
        key={cartProduct.id}
        index={index}
        id={cartProduct.id}
        quantity={cartProduct.quantity}
        product={cartProduct.product}
      />
    );
  });

  return <ul className={styles.list}>{cartProductsList}</ul>;
};

export default CartProductsList;
