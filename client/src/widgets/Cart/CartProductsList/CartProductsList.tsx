import { useGetCartProductsQuery } from '@shared/api/cartApi';
import CartProduct from '../CartProduct/CartProduct';

import styles from './CartProductsList.module.css';

const CartProductsList = () => {
  const { data: cartProducts } = useGetCartProductsQuery();

  const cartProductsList = cartProducts?.map((cartProduct) => {
    return (
      <CartProduct
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
