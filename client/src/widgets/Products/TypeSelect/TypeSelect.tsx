import { FC, useEffect, useState } from 'react';

import { useLazyGetTypesQuery } from '../../../shared/api/typeApi';
import { IProductType } from '../../../shared/models/product';

import styles from './TypeSelect.module.css';

type TTypeSelect = {
  setProductType: (productType: string) => void;
};

const TypeSelect: FC<TTypeSelect> = ({ setProductType }) => {
  const [trigger] = useLazyGetTypesQuery();
  const [productTypes, setProductTypes] = useState<IProductType[]>();

  useEffect(() => {
    trigger().then((res) => {
      if (res.data) {
        setProductTypes(res.data);
        setProductType(res.data[0].id);
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.label}>Choose type</div>
      <select
        onChange={(e) => setProductType(e.target.value)}
        className={styles.select}
      >
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
