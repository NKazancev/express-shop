import { useGetCountriesQuery } from '@shared/api/countryApi';
import DeliveryCountry from '../DeliveryCountry/DeliveryCountry';

import styles from './CountriesList.module.css';

const CountriesList = () => {
  const { data: countries } = useGetCountriesQuery();

  return (
    <ul className={styles.list}>
      {countries?.map((country) => {
        return <DeliveryCountry key={country.id} {...country} />;
      })}
    </ul>
  );
};

export default CountriesList;
