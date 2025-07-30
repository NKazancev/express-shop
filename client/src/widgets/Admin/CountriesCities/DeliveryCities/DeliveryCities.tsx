import { Dispatch, FC, SetStateAction } from 'react';

import { ICity } from '@shared/models/country';
import DeleteDeliveryCity from '@processes/DeleteDeliveryCity';

import styles from './DeliveryCities.module.css';

type TDeliveryCities = {
  citiesList: ICity[];
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const DeliveryCities: FC<TDeliveryCities> = ({ citiesList, setIsSuccess }) => {
  return (
    <ul className={styles.list}>
      {citiesList?.map(({ id, name }) => {
        return (
          <li key={id} className={styles.city}>
            <span>{name}</span>
            <DeleteDeliveryCity cityId={id} setIsSuccess={setIsSuccess} />
          </li>
        );
      })}
    </ul>
  );
};

export default DeliveryCities;
