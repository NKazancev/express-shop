import { ChangeEvent, useEffect, useState } from 'react';

import { useLazyGetBrandsQuery } from '@shared/api/brandApi';
import { IBrandCheckbox, IProductBrand } from '@shared/models/typesbrands';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { setBrandFilters } from '@shared/slices/filtersSlice';
import Dropdown from '@shared/ui/Dropdown/Dropdown';

import styles from './BrandFilters.module.css';

const BrandFilters = () => {
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetBrandsQuery<IProductBrand[]>();
  const [checkboxes, setCheckboxes] = useState<IBrandCheckbox[]>();

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  useEffect(() => {
    if (!checkboxes) {
      trigger().then((res) => {
        const data = res.data?.reduce((acc, el) => {
          acc.push({ ...el, checked: false });
          return acc;
        }, [] as IBrandCheckbox[]);
        setCheckboxes(data);
      });
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

  const dispatchBrands = () => {
    dispatch(setBrandFilters(checkboxes));
    setDropdownVisible(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.brandsButton}
      >
        Brands
      </button>

      <Dropdown isVisible={dropdownVisible} onClose={closeDropdown}>
        <div className={styles.container}>
          <ul className={styles.list}>{checkboxesList}</ul>
          <button
            type="button"
            onClick={dispatchBrands}
            className={styles.button}
          >
            Apply
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default BrandFilters;
