import { useState } from 'react';

import { useCreateCityMutation } from '@shared/api/cityApi';
import { ICity } from '@shared/models/country';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import CityForm from '@widgets/Admin/CountriesCities/CityForm/CityForm';
import CitiesList from '@widgets/Admin/CountriesCities/CitiesList/CitiesList';

const CreateDeliveryCity = () => {
  const [createCity] = useCreateCityMutation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<string>('');
  const cities = useCitiesOptions(countryId, isSuccess);

  const [error, setError] = useState<string>();

  const handleCityCreation = async (data: Omit<ICity, 'id'>) => {
    setIsSuccess(false);
    try {
      const response = await createCity({ ...data }).unwrap();
      if (response) {
        setIsSuccess(true);
        setError('');
      }
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <CityForm
        createDeliveryCity={handleCityCreation}
        setCountryId={setCountryId}
        apiError={error}
      />
      <CitiesList cities={cities} setIsSuccess={setIsSuccess} />
    </div>
  );
};

export default CreateDeliveryCity;
