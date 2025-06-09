import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICountry } from '@shared/models/country';
import Input from '@shared/ui/Input/Input';

import styles from './CountryForm.module.css';

type TCountryForm = {
  onCountryCreation: (data: Omit<ICountry, 'id'>) => void;
};

const CountryForm: FC<TCountryForm> = ({ onCountryCreation }) => {
  const { control, handleSubmit } = useForm<Omit<ICountry, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onCountryCreation)} className={styles.form}>
      <Input
        name="name"
        label="Country name"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Add country
      </button>
    </form>
  );
};

export default CountryForm;
