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
};

const HandleAddressForm: FC<THandleAddressForm> = ({
  handleAddress,
  isUpdate,
  address,
}) => {
  const { control, handleSubmit } = useForm<Omit<IAddress, 'id'>>({
    defaultValues: address,
    resetOptions: { keepDirtyValues: true, keepErrors: true },
  });

  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>(
    address?.countryId
  );
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form onSubmit={handleSubmit(handleAddress)} className={styles.form}>
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
        {!isUpdate ? 'Create address' : 'Update address'}
      </button>
    </form>
  );
};

export default HandleAddressForm;
