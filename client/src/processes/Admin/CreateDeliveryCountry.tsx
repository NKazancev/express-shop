import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import {
  useCreateCountryMutation,
  useGetCountriesQuery,
} from '@shared/api/countryApi';
import { ICountry } from '@shared/models/country';

import CountryForm from '@widgets/Admin/CountriesCities/CountryForm/CountryForm';
import DeliveryCountries from '@widgets/Admin/CountriesCities/DeliveryCountries/DeliveryCountries';

const CreateDeliveryCountry = () => {
  const [createCountry] = useCreateCountryMutation();
  const { data: countries } = useGetCountriesQuery();

  const [error, setError] = useState<string>();

  const handleCountryCreation = async (data: Omit<ICountry, 'id'>) => {
    try {
      const response = await createCountry(data.name).unwrap();
      if (response) setError('');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <CountryForm
        createDeliveryCountry={handleCountryCreation}
        apiError={error}
      />
      {countries && <DeliveryCountries countries={countries} />}
    </div>
  );
};

export default CreateDeliveryCountry;
