import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { ICity } from '@shared/models/country';
import { useCreateCityMutation } from '@shared/api/cityApi';
import useCitiesOptions from '@shared/hooks/useCitiesOptions';

import CityForm from '@widgets/Admin/CountriesCities/CityForm/CityForm';
import DeliveryCities from '@widgets/Admin/CountriesCities/DeliveryCities/DeliveryCities';

const CreateDeliveryCity = () => {
  const [createCity] = useCreateCityMutation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<string>('');

  const citiesList = useCitiesOptions(countryId, isSuccess);

  const [error, setError] = useState<string>();

  const handleCityCreation = async (data: Omit<ICity, 'id'>) => {
    setIsSuccess(false);
    try {
      const response = await createCity({ ...data }).unwrap();
      if (response) {
        setIsSuccess(true);
        setError('');
      }
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
      <CityForm
        createDeliveryCity={handleCityCreation}
        setCountryId={setCountryId}
        apiError={error}
      />
      {citiesList && (
        <DeliveryCities citiesList={citiesList} setIsSuccess={setIsSuccess} />
      )}
    </div>
  );
};

export default CreateDeliveryCity;
