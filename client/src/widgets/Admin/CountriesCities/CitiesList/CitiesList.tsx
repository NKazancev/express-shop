import { FC } from 'react';

import { ICity } from '@shared/models/country';
import DeliveryCity from '../DeliveryCity/DeliveryCity';

import styles from './CitiesList.module.css';

type TCitiesList = {
  cities?: ICity[];
  setIsSuccess: (data: boolean) => void;
};

const CitiesList: FC<TCitiesList> = ({ cities, setIsSuccess }) => {
  return (
    <ul className={styles.list}>
      {cities?.map((city) => {
        return (
          <DeliveryCity
            key={city.id}
            id={city.id}
            name={city.name}
            setIsSuccess={setIsSuccess}
          />
        );
      })}
    </ul>
  );
};

export default CitiesList;
