import { FC } from 'react';

import { useDeleteCountryMutation } from '@shared/api/countryApi';
import { ICountry } from '@shared/models/country';

import xbutton from '@shared/assets/x-button.svg';
import styles from './DeliveryCountry.module.css';

const DeliveryCountry: FC<ICountry> = ({ id, name }) => {
  const [deleteCountry] = useDeleteCountryMutation();

  const handleDelete = async () => {
    try {
      await deleteCountry(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.country}>
      <span>{name}</span>
      <button type="button" onClick={handleDelete}>
        <img src={xbutton} alt="x" width={10} />
      </button>
    </li>
  );
};

export default DeliveryCountry;
