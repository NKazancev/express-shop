import { FC } from 'react';

import { useDeleteCityMutation } from '@shared/api/cityApi';
import { ICity } from '@shared/models/country';

import xbutton from '@shared/assets/x-button.svg';
import styles from './DeliveryCity.module.css';

type TDeliveryCity = Pick<ICity, 'id' | 'name'> & {
  setIsSuccess: (data: boolean) => void;
};

const DeliveryCity: FC<TDeliveryCity> = ({ id, name, setIsSuccess }) => {
  const [deleteCity] = useDeleteCityMutation();

  const handleDelete = async () => {
    setIsSuccess(false);
    try {
      await deleteCity(id).unwrap();
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.city}>
      <span>{name}</span>
      <button type="button" onClick={handleDelete}>
        <img src={xbutton} alt="x" width={10} />
      </button>
    </li>
  );
};

export default DeliveryCity;
