import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICity } from '@shared/models/country';
import { useGetCountriesQuery } from '@shared/api/countryApi';

import Select from '@shared/ui/Select/Select';
import Input from '@shared/ui/Input/Input';

import styles from './CityForm.module.css';

type TCityForm = {
  createDeliveryCity: (data: Omit<ICity, 'id'>) => void;
  setCountryId: (data: string) => void;
  apiError?: string;
};

const CityForm: FC<TCityForm> = (props) => {
  const { createDeliveryCity, setCountryId, apiError } = props;

  const { control, formState, reset, watch, handleSubmit } =
    useForm<Omit<ICity, 'id'>>();
  const { errors, isSubmitting } = formState;

  const { data: countriesOptions } = useGetCountriesQuery();
  const countryId = watch('countryId');

  const onSubmit = (data: Omit<ICity, 'id'>) => {
    createDeliveryCity(data);
    reset({ countryId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Select
        name="countryId"
        label="Country"
        options={countriesOptions}
        firstOption="Choose country"
        onChange={(id: string) => setCountryId(id)}
        control={control}
        error={errors.countryId}
      />
      <Input
        name="name"
        label="City name"
        disabled={!countryId}
        control={control}
        error={errors.name}
      />

      <button
        type="submit"
        disabled={!countryId || isSubmitting}
        style={{ cursor: countryId ? 'pointer' : 'auto' }}
        className={styles.button}
      >
        Add city
      </button>
    </form>
  );
};

export default CityForm;
