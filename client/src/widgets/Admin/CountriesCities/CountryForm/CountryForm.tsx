import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICountry } from '@shared/models/country';
import Input from '@shared/ui/Input/Input';

import styles from './CountryForm.module.css';

type TCountryForm = {
  createDeliveryCountry: (data: Omit<ICountry, 'id'>) => void;
  apiError?: string;
};

const CountryForm: FC<TCountryForm> = ({ createDeliveryCountry, apiError }) => {
  const { control, formState, reset, handleSubmit } =
    useForm<Omit<ICountry, 'id'>>();
  const { errors, isSubmitting } = formState;

  const onSubmit = (data: Omit<ICountry, 'id'>) => {
    createDeliveryCountry(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        name="name"
        label="Country name"
        control={control}
        error={errors.name}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Add country
      </button>
    </form>
  );
};

export default CountryForm;
