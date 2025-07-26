import DeleteDeliveryCountry from '@processes/DeleteDeliveryCountry';

import { useGetCountriesQuery } from '@shared/api/countryApi';

import styles from './DeliveryCountries.module.css';

const DeliveryCountries = () => {
  const { data: countries } = useGetCountriesQuery();

  return (
    <ul className={styles.list}>
      {countries?.map(({ id, name }) => {
        return (
          <li key={id} className={styles.country}>
            <span>{name}</span>
            <DeleteDeliveryCountry countryId={id} />
          </li>
        );
      })}
    </ul>
  );
};

export default DeliveryCountries;
