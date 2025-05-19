import { useForm } from 'react-hook-form';

import { useGetCartProductsQuery } from '@shared/api/cartApi';
import { ICreateOrderData } from '@shared/models/order';

import CheckoutForm from '@widgets/Checkout/CheckoutForm/CheckoutForm';
import CheckoutTotal from '@widgets/Checkout/CheckoutTotal/CheckoutTotal';

import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { register, handleSubmit } = useForm<ICreateOrderData>();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Delivery information</h3>
        <p className={styles.notification}>All fields are mandatory</p>

        <CheckoutForm register={register} />
      </div>

      <div className={styles.total}>
        <CheckoutTotal items={cartProducts} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CheckoutPage;
