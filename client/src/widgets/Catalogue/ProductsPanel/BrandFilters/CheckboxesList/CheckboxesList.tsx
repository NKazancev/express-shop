import { IBrandCheckbox } from '@shared/models/typesbrands';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import styles from './CheckboxesList.module.css';

type TCheckboxesList = {
  checkboxes: IBrandCheckbox[];
  setCheckboxes: Dispatch<SetStateAction<IBrandCheckbox[] | []>>;
};

const CheckboxesList: FC<TCheckboxesList> = (props) => {
  const { checkboxes, setCheckboxes } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxes((brands) => {
      return brands?.map((brand) => {
        return e.target.id === brand.id
          ? { ...brand, checked: !brand.checked }
          : brand;
      });
    });
  };

  const list = checkboxes?.map((brand) => {
    return (
      <li key={brand.id} className={styles.checkbox}>
        <label htmlFor={brand.id} className={styles.label}>
          <input
            type="checkbox"
            id={brand.id}
            checked={brand.checked}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <span>{brand.name}</span>
        </label>
      </li>
    );
  });

  return <ul className={styles.list}>{list}</ul>;
};

export default CheckboxesList;
