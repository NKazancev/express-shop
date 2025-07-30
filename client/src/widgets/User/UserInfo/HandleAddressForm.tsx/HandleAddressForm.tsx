import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IAddress } from '@shared/models/address';
import { useGetCountriesQuery } from '@shared/api/countryApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import Input from '@shared/ui/Input/Input';
import Select from '@shared/ui/Select/Select';

import styles from './HandleAddressForm.module.css';

type THandleAddressForm = {
  handleAddress: (data: Omit<IAddress, 'id'>) => void;
  isUpdate: boolean;
  address?: IAddress;
  apiError?: string;
};

const HandleAddressForm: FC<THandleAddressForm> = (props) => {
  const { handleAddress, isUpdate, address, apiError } = props;

  const { control, handleSubmit, setValue, formState } = useForm<
    Omit<IAddress, 'id'>
  >({
    defaultValues: address,
    resetOptions: { keepDirtyValues: true, keepErrors: true },
  });
  const { errors } = formState;

  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>(
    address?.countryId
  );
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form onSubmit={handleSubmit(handleAddress)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Select
        name="countryId"
        label="Country"
        options={countriesOptions}
        firstOption="Choose country"
        control={control}
        onChange={(id: string) => {
          setValue('cityId', '');
          setCountryId(id);
        }}
        error={errors.countryId}
      />
      <Select
        name="cityId"
        label="City"
        options={citiesOptions}
        firstOption="Choose city"
        control={control}
        disabled={!Boolean(countryId)}
        error={errors.cityId}
      />
      <Input
        name="street"
        label="Street"
        control={control}
        error={errors.street}
      />
      <Input
        name="postcode"
        label="Postcode"
        control={control}
        error={errors.postcode}
      />

      <button type="submit" className={styles.button}>
        {!isUpdate ? 'Create address' : 'Update address'}
      </button>
    </form>
  );
};

export default HandleAddressForm;
