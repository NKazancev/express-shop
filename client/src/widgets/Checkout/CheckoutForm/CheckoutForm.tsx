import { FC, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ICreateOrderData } from '@shared/models/order';
import { useGetCountriesQuery } from '@shared/api/countryApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import styles from './CheckoutForm.module.css';

type TCheckoutForm = {
  register: UseFormRegister<ICreateOrderData>;
};

const CheckoutForm: FC<TCheckoutForm> = ({ register }) => {
  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>();
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form className={styles.form}>
      <label htmlFor="firstname" className={styles.label}>
        <span>First name</span>
        <input
          type="text"
          id="firstname"
          autoComplete="off"
          className={styles.input}
          {...register('firstName', { required: true })}
        />
      </label>

      <label htmlFor="country" className={styles.label}>
        <span>Country</span>
        <select
          id="country"
          {...register('country', { required: true })}
          onChange={(e) => setCountryId(e.target.value)}
          className={styles.select}
        >
          <option value="" hidden>
            Choose country
          </option>
          {countriesOptions?.map((country) => {
            return (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            );
          })}
        </select>
      </label>

      <label htmlFor="lastname" className={styles.label}>
        <span>Last name</span>
        <input
          type="text"
          id="lastname"
          autoComplete="off"
          className={styles.input}
          {...register('lastName', { required: true })}
        />
      </label>

      <label htmlFor="city" className={styles.label}>
        <span>City</span>
        <select
          id="city"
          {...register('city', { required: true })}
          style={{ pointerEvents: countryId ? 'all' : 'none' }}
          className={styles.select}
        >
          {countryId && (
            <option value="" hidden>
              Choose city
            </option>
          )}
          {citiesOptions?.map((city) => {
            return (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            );
          })}
        </select>
      </label>

      <label htmlFor="email" className={styles.label}>
        <span>Email</span>
        <input
          type="email"
          id="email"
          autoComplete="off"
          className={styles.input}
          {...register('email', { required: true })}
        />
      </label>

      <label htmlFor="postcode" className={styles.label}>
        <span>Postcode</span>
        <input
          type="text"
          id="postcode"
          autoComplete="off"
          className={styles.input}
          {...register('postcode', { required: true })}
        />
      </label>

      <label htmlFor="street" className={styles.label}>
        <span>Street</span>
        <input
          type="text"
          id="street"
          autoComplete="off"
          className={styles.input}
          {...register('street', { required: true })}
        />
      </label>

      <label htmlFor="phone" className={styles.label}>
        <span>Phone</span>
        <input
          type="tel"
          id="phone"
          autoComplete="off"
          className={styles.input}
          {...register('phone', { required: true })}
        />
      </label>
    </form>
  );
};

export default CheckoutForm;
