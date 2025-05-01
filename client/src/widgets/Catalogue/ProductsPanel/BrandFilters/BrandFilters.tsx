import { ChangeEvent, useEffect, useState } from 'react';

import { useLazyGetBrandsQuery } from '@shared/api/brandApi';
import { IBrandCheckbox, IProductBrand } from '@shared/models/product';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { setBrandFilters } from '@shared/slices/filtersSlice';

import styles from './BrandFilters.module.css';

const BrandFilters = () => {
  const [trigger] = useLazyGetBrandsQuery<IProductBrand[]>();
  const [checkboxes, setCheckboxes] = useState<IBrandCheckbox[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!checkboxes) {
      trigger().then((res) => {
        const data = res.data?.reduce((acc, el) => {
          acc.push({ ...el, checked: false });
          return acc;
        }, [] as IBrandCheckbox[]);
        setCheckboxes(data);
      });
    } else {
      dispatch(setBrandFilters(checkboxes));
    }
  }, [checkboxes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxes((brands) => {
      return brands?.map((brand) => {
        return e.target.id === brand.id
          ? { ...brand, checked: !brand.checked }
          : brand;
      });
    });
  };

  const checkboxesList = checkboxes?.map((brand) => {
    return (
      <li key={brand.id} className={styles.checkbox}>
        <input
          type="checkbox"
          id={brand.id}
          checked={brand.checked}
          onChange={handleChange}
        />
        <label htmlFor={brand.id} className={styles.label}>
          {brand.name}
        </label>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{checkboxesList}</ul>
    </div>
  );
};

export default BrandFilters;
