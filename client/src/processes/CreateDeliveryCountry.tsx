import { useCreateCountryMutation } from '@shared/api/countryApi';
import { ICountry } from '@shared/models/country';
import CountryForm from '@widgets/Admin/CountriesCities/CountryForm/CountryForm';

const CreateDeliveryCountry = () => {
  const [createCountry] = useCreateCountryMutation();

  const handleCountryCreation = async (data: Omit<ICountry, 'id'>) => {
    try {
      await createCountry(data.name).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return <CountryForm onCountryCreation={handleCountryCreation} />;
};

export default CreateDeliveryCountry;
