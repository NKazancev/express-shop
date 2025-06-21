import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { useGetUserInfoQuery } from '@shared/api/userApi';
import { ICreateOrderData } from '@shared/models/order';

import CheckoutForm from '@widgets/Checkout/CheckoutForm/CheckoutForm';
import CheckoutTotal from '@widgets/Checkout/CheckoutTotal/CheckoutTotal';

import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { data: user } = useGetUserInfoQuery();

  const formData = {
    email: user?.email,
    country: user?.address?.countryId,
    city: user?.address?.cityId,
    postcode: user?.address?.postcode,
    street: user?.address?.street,
  };

  const { control, handleSubmit, reset } = useForm<ICreateOrderData>({
    defaultValues: formData,
    resetOptions: { keepDirtyValues: true, keepErrors: true },
  });

  useEffect(() => {
    reset(formData);
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Delivery information</h3>
        <p className={styles.notification}>All fields are mandatory</p>

        {!user?.address && <CheckoutForm control={control} />}

        {user?.address && (
          <CheckoutForm
            control={control}
            defaultCountryId={user?.address?.countryId}
          />
        )}
      </div>

      <div className={styles.total}>
        <CheckoutTotal items={cartProducts} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CheckoutPage;
