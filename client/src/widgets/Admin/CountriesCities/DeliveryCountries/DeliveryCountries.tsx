import { FC } from 'react';

import { ICountry } from '@shared/models/country';
import DeleteDeliveryCountry from '@processes/DeleteDeliveryCountry';

import styles from './DeliveryCountries.module.css';

type TDeliveryCountries = {
  countries: ICountry[];
};

const DeliveryCountries: FC<TDeliveryCountries> = ({ countries }) => {
  return (
    <ul className={styles.list}>
      {countries.map(({ id, name }) => {
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
