import { useEffect, useState } from 'react';

import { useLazyGetBrandsQuery } from '@shared/api/brandApi';
import { IBrandCheckbox, IProductBrand } from '@shared/models/typesbrands';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { setBrandFilters } from '@shared/slices/filtersSlice';

import Dropdown from '@shared/ui/Dropdown/Dropdown';
import CheckboxesList from './CheckboxesList/CheckboxesList';

import styles from './BrandFilters.module.css';

const BrandFilters = () => {
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetBrandsQuery<IProductBrand[]>();

  const [checkboxes, setCheckboxes] = useState<IBrandCheckbox[] | []>(
    JSON.parse(localStorage.getItem('checkboxes') || '[]')
  );

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  useEffect(() => {
    if (!checkboxes.length) {
      trigger().then((res) => {
        const data = res.data?.reduce((acc, el) => {
          acc.push({ ...el, checked: false });
          return acc;
        }, [] as IBrandCheckbox[]);
        if (data) setCheckboxes(data);
      });
    }
  }, [checkboxes]);

  const dispatchBrands = () => {
    const brands = checkboxes
      ?.reduce((acc: string[], el: IBrandCheckbox) => {
        if (el.checked) acc.push(el.id);
        return acc;
      }, [] as string[])
      .join(',');

    dispatch(setBrandFilters(brands));
    localStorage.setItem('brands', brands);
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
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
          <CheckboxesList
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
          <button
            type="button"
            onClick={dispatchBrands}
            className={styles.applyButton}
          >
            Apply
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default BrandFilters;
