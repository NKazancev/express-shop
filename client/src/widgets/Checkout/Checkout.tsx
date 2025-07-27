import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ICartProduct } from '@shared/models/cart';
import { TUserInfo } from '@shared/models/user';
import { ICreateOrderData } from '@shared/models/order';

import CheckoutForm from './CheckoutForm/CheckoutForm';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';

import styles from './Checkout.module.css';

type TCheckout = {
  cartProducts: ICartProduct[];
  user: TUserInfo;
};

const Checkout: FC<TCheckout> = ({ cartProducts, user }) => {
  const formData = {
    email: user?.email,
    country: user?.address?.countryId,
    city: user?.address?.cityId,
    postcode: user?.address?.postcode,
    street: user?.address?.street,
  };

  const { control, handleSubmit, reset, formState } = useForm<ICreateOrderData>(
    {
      defaultValues: formData,
      resetOptions: { keepDirtyValues: true, keepErrors: true },
    }
  );

  const { errors, isSubmitting } = formState;
  const [error, setError] = useState<string>('');

  useEffect(() => {
    reset(formData);
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Delivery information</h3>
        <p className={styles.notification}>All fields are mandatory</p>

        {!user?.address && (
          <CheckoutForm control={control} errors={errors} apiError={error} />
        )}

        {user?.address && (
          <CheckoutForm
            control={control}
            defaultCountryId={user?.address?.countryId}
            errors={errors}
            apiError={error}
          />
        )}
      </div>

      <div className={styles.total}>
        <CheckoutTotal
          items={cartProducts}
          handleSubmit={handleSubmit}
          setError={setError}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default Checkout;
