import { FC, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { ICreateOrderData } from '@shared/models/order';
import { useGetCountriesQuery } from '@shared/api/countryApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import Input from '@shared/ui/Input/Input';
import Select from '@shared/ui/Select/Select';

import styles from './CheckoutForm.module.css';

type TCheckoutForm = {
  control: Control<ICreateOrderData>;
  defaultCountryId?: string;
  errors: FieldErrors<ICreateOrderData>;
  apiError?: string;
};

const CheckoutForm: FC<TCheckoutForm> = (props) => {
  const { control, defaultCountryId, errors, apiError } = props;

  const { data: countriesOptions } = useGetCountriesQuery();
  const [countryId, setCountryId] = useState<string | undefined>(
    defaultCountryId
  );
  const citiesOptions = useCitiesOptions(countryId);

  return (
    <form className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <div className={styles.container}>
        <Input
          name="firstName"
          label="First name"
          control={control}
          error={errors.firstName}
        />
        <Select
          name="country"
          label="Country"
          options={countriesOptions}
          firstOption="Choose country"
          control={control}
          error={errors.country}
          onChange={(id: string) => setCountryId(id)}
        />
        <Input
          name="lastName"
          label="Last name"
          control={control}
          error={errors.lastName}
        />
        <Select
          name="city"
          label="City"
          options={citiesOptions}
          firstOption="Choose city"
          control={control}
          error={errors.city}
          disabled={!Boolean(countryId)}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          control={control}
          error={errors.email}
        />
        <Input
          name="postcode"
          label="Postcode"
          control={control}
          error={errors.postcode}
        />
        <Input
          name="street"
          label="Street"
          control={control}
          error={errors.street}
          containerStyle={{ gridColumn: 'span 2' }}
        />
        <Input
          type="tel"
          name="phone"
          label="Phone"
          control={control}
          error={errors.phone}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
