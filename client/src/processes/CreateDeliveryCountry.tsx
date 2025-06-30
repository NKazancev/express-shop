import { useState } from 'react';

import { useCreateCountryMutation } from '@shared/api/countryApi';
import { ICountry } from '@shared/models/country';

import CountryForm from '@widgets/Admin/CountriesCities/CountryForm/CountryForm';

const CreateDeliveryCountry = () => {
  const [createCountry] = useCreateCountryMutation();

  const [error, setError] = useState<string>();

  const handleCountryCreation = async (data: Omit<ICountry, 'id'>) => {
    try {
      const response = await createCountry(data.name).unwrap();
      if (response) setError('');
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <CountryForm
      createDeliveryCountry={handleCountryCreation}
      apiError={error}
    />
  );
};

export default CreateDeliveryCountry;
