import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { useGetUserInfoQuery } from '@shared/api/userApi';

import Checkout from '@widgets/Checkout/Checkout';

import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { data: user } = useGetUserInfoQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts?.length === 0) {
      navigate('/');
    }
  }, [cartProducts, navigate]);

  return (
    <div className={styles.container}>
      {cartProducts && user && (
        <Checkout cartProducts={cartProducts} user={user} />
      )}
    </div>
  );
};

export default CheckoutPage;
