import { FC } from 'react';
import { useGetTypesQuery } from '../../../shared/api/typeApi';

import styles from './TypeSelect.module.css';

type TTypeSelect = {
  setProductType: (productType: string) => void;
};

const TypeSelect: FC<TTypeSelect> = ({ setProductType }) => {
  const { data: productTypes } = useGetTypesQuery();

  return (
    <div>
      <div className={styles.label}>Choose type</div>
      <select
        onChange={(e) => setProductType(e.target.value)}
        className={styles.select}
      >
        <option value="All">All</option>
        {productTypes?.map((type) => {
          return (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TypeSelect;
