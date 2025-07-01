import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

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
    <CountryForm
      createDeliveryCountry={handleCountryCreation}
      apiError={error}
    />
  );
};

export default CreateDeliveryCountry;
