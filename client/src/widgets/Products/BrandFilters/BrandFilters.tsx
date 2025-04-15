import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useLazyGetBrandsQuery } from '../../../shared/api/brandApi';
import { IBrandCheckbox, IProductBrand } from '../../../shared/models/product';

import styles from './BrandFilters.module.css';

type TBrandFilters = {
  setBrandFilters: (brands: string) => void;
};

const BrandFilters: FC<TBrandFilters> = ({ setBrandFilters }) => {
  const [trigger] = useLazyGetBrandsQuery<IProductBrand[]>();
  const [checkboxes, setCheckboxes] = useState<IBrandCheckbox[]>();

  useEffect(() => {
    trigger().then((res) => {
      const data = res.data
        ?.reduce((acc, el) => {
          acc.push({ ...el, checked: false });
          return acc;
        }, [] as IBrandCheckbox[])
        .sort((a, b) => a.name.localeCompare(b.name));
      setCheckboxes(data);
    });
  }, []);

  useEffect(() => {
    if (checkboxes)
      setBrandFilters(
        checkboxes
          .reduce((acc, el) => {
            if (el.checked) acc.push(el.id);
            return acc;
          }, [] as string[])
          .join(',')
      );
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

  return (
    <div>
      <div className={styles.title}>Choose brands</div>

      <ul className={styles.list}>
        {checkboxes?.map((brand) => {
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
        })}
      </ul>
    </div>
  );
};

export default BrandFilters;
