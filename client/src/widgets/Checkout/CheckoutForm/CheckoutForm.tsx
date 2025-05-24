import { FC, useState } from 'react';
import { Control } from 'react-hook-form';

import { ICreateOrderData } from '@shared/models/order';
import { useGetCountriesQuery } from '@shared/api/countryApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import Input from '@shared/ui/Input/Input';
import Select from '@shared/ui/Select/Select';

import styles from './CheckoutForm.module.css';

type TCheckoutForm = {
  control: Control<ICreateOrderData>;
};

const CheckoutForm: FC<TCheckoutForm> = ({ control }) => {
  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>();
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form className={styles.form}>
      <Input
        name="firstName"
        label="First name"
        control={control}
        rules={{ required: true }}
      />

      <Select
        name="country"
        label="Country"
        options={countriesOptions}
        firstOption="Choose country"
        control={control}
        onChange={(id: string) => setCountryId(id)}
        rules={{ required: true }}
      />

      <Input
        name="lastName"
        label="Last name"
        control={control}
        rules={{ required: true }}
      />

      <Select
        name="city"
        label="City"
        options={citiesOptions}
        firstOption="Choose city"
        control={control}
        disabled={!Boolean(countryId)}
        rules={{ required: true }}
      />

      <Input
        type="email"
        name="email"
        label="Email"
        control={control}
        rules={{ required: true }}
      />

      <Input
        name="postcode"
        label="Postcode"
        control={control}
        rules={{ required: true }}
      />

      <div style={{ gridColumn: 'span 2' }}>
        <Input
          name="street"
          label="Street"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <Input
        type="tel"
        name="phone"
        label="Phone"
        control={control}
        rules={{ required: true }}
      />
    </form>
  );
};

export default CheckoutForm;
