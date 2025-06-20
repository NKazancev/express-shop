import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IAddress } from '@shared/models/address';
import { useGetCountriesQuery } from '@shared/api/countryApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import Input from '@shared/ui/Input/Input';
import Select from '@shared/ui/Select/Select';

import styles from './HandleAddressForm.module.css';

type THandleAddressForm = {
  handleAddressChange: (data: Omit<IAddress, 'id'>) => void;
};

const HandleAddressForm: FC<THandleAddressForm> = ({ handleAddressChange }) => {
  const { control, handleSubmit } = useForm<Omit<IAddress, 'id'>>();

  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>();
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form onSubmit={handleSubmit(handleAddressChange)} className={styles.form}>
      <Select
        name="countryId"
        label="Country"
        options={countriesOptions}
        firstOption="Choose country"
        control={control}
        onChange={(id: string) => setCountryId(id)}
        rules={{ required: true }}
      />
      <Select
        name="cityId"
        label="City"
        options={citiesOptions}
        firstOption="Choose city"
        control={control}
        disabled={!Boolean(countryId)}
        rules={{ required: true }}
      />
      <Input
        name="street"
        label="Street"
        control={control}
        rules={{ required: true }}
      />
      <Input
        name="postcode"
        label="Postcode"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default HandleAddressForm;
