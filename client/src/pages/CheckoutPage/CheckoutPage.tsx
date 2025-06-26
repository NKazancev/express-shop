import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { useGetUserInfoQuery } from '@shared/api/userApi';

import Checkout from '@widgets/Checkout/Checkout';

import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { data: user } = useGetUserInfoQuery();

  return (
    <div className={styles.container}>
      {cartProducts && user && (
        <Checkout cartProducts={cartProducts} user={user} />
      )}
    </div>
  );
};

export default CheckoutPage;
