import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICity } from '@shared/models/country';
import { useGetCountriesQuery } from '@shared/api/countryApi';

import Select from '@shared/ui/Select/Select';
import Input from '@shared/ui/Input/Input';

import styles from './CityForm.module.css';

type TCityForm = {
  onCityCreation: (data: Omit<ICity, 'id'>) => void;
  setCountryId: (data: string) => void;
};

const CityForm: FC<TCityForm> = ({ onCityCreation, setCountryId }) => {
  const { control, watch, handleSubmit } = useForm<Omit<ICity, 'id'>>();
  const { data: countriesOptions } = useGetCountriesQuery();
  const isCountryId = Boolean(watch('countryId'));

  return (
    <form onSubmit={handleSubmit(onCityCreation)} className={styles.form}>
      <Select
        name="countryId"
        label="Country"
        options={countriesOptions}
        firstOption="Choose country"
        onChange={(id: string) => setCountryId(id)}
        control={control}
        rules={{ required: true }}
      />

      <Input
        name="name"
        label="City name"
        disabled={!isCountryId}
        control={control}
        rules={{ required: true }}
      />

      <button
        type="submit"
        disabled={!isCountryId}
        style={{ cursor: isCountryId ? 'pointer' : 'auto' }}
        className={styles.button}
      >
        Add city
      </button>
    </form>
  );
};

export default CityForm;
