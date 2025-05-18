import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ICreateOrderData } from '@shared/models/order';

import styles from './Checkoutform.module.css';

type TCheckoutForm = {
  register: UseFormRegister<ICreateOrderData>;
};

const CheckoutForm: FC<TCheckoutForm> = ({ register }) => {
  return (
    <form className={styles.form}>
      <label htmlFor="first-name-checkout" className={styles.label}>
        <span>First name*</span>
        <input
          type="text"
          id="first-name-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('firstName', { required: true })}
        />
      </label>

      <label htmlFor="last-name-checkout" className={styles.label}>
        <span>Last name*</span>
        <input
          type="text"
          id="last-name-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('lastName', { required: true })}
        />
      </label>

      <label htmlFor="email-checkout" className={styles.label}>
        <span>Email*</span>
        <input
          type="email"
          id="email-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('email', { required: true })}
        />
      </label>

      <label htmlFor="phone-checkout" className={styles.label}>
        <span>Phone*</span>
        <input
          type="tel"
          id="phone-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('phone', { required: true })}
        />
      </label>

      <label htmlFor="city-checkout" className={styles.label}>
        <span>City*</span>
        <input
          type="text"
          id="city-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('city', { required: true })}
        />
      </label>

      <label htmlFor="street-checkout" className={styles.label}>
        <span>Street*</span>
        <input
          type="text"
          id="street-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('street', { required: true })}
        />
      </label>

      <label htmlFor="postcode-checkout" className={styles.label}>
        <span>Postcode*</span>
        <input
          type="text"
          id="postcode-checkout"
          autoComplete="off"
          className={styles.input}
          {...register('postcode', { required: true })}
        />
      </label>
    </form>
  );
};

export default CheckoutForm;
