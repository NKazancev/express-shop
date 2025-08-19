import { Dispatch, FC, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ICreateOrderData } from '@shared/models/order';
import { ICity, ICountry } from '@shared/models/country';
import Input from '@shared/ui/Input/Input';
import Select from '@shared/ui/Select/Select';

import styles from './CheckoutForm.module.css';

type TCheckoutForm = {
  control: Control<ICreateOrderData>;
  countriesOptions?: ICountry[];
  citiesOptions?: ICity[];
  countryId?: string;
  setCountryId: Dispatch<SetStateAction<string>>;
  setCityValue: UseFormSetValue<ICreateOrderData>;
  errors: FieldErrors<ICreateOrderData>;
  apiError?: string;
};

const CheckoutForm: FC<TCheckoutForm> = (props) => {
  const {
    control,
    countriesOptions,
    citiesOptions,
    countryId,
    setCountryId,
    setCityValue,
    errors,
    apiError,
  } = props;

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
          onChange={(id: string) => {
            setCityValue('city', '');
            setCountryId(id);
          }}
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
