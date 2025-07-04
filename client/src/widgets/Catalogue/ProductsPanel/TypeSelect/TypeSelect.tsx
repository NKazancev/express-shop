import { useEffect, useState } from 'react';

import { useLazyGetTypesQuery } from '@shared/api/typeApi';
import { IProductType } from '@shared/models/typesbrands';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { setProductType } from '@shared/slices/filtersSlice';

import styles from './TypeSelect.module.css';

const TypeSelect = () => {
  const [trigger] = useLazyGetTypesQuery();
  const [productTypes, setProductTypes] = useState<IProductType[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productTypes) {
      trigger().then((res) => {
        if (res.data) {
          setProductTypes(res.data);
          dispatch(setProductType(res.data[0].id));
        }
      });
    }
  }, [productTypes]);

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => dispatch(setProductType(e.target.value))}
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
