import { MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useLazyGetBrandsQuery } from '@shared/api/brandApi';
import { IBrandCheckbox, IProductBrand } from '@shared/models/typesbrands';
import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { setBrandFilters } from '@shared/slices/filtersSlice';

import Dropdown from '@shared/ui/Dropdown/Dropdown';
import CheckboxesList from './CheckboxesList/CheckboxesList';

import arrowIcon from '@shared/assets/arrow.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './BrandFilters.module.css';

const BrandFilters = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { brandFilters } = useAppSelector((state) => state.filters);

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
    closeDropdown();
    navigate(`${pathname.replace(/\d+/, '1')}`);

    if (checkboxes.every((el) => !el.checked)) {
      localStorage.removeItem('brands');
      localStorage.removeItem('checkboxes');
    }
  };

  const resetBrands = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setBrandFilters(''));
    setCheckboxes([]);
    localStorage.removeItem('brands');
    localStorage.removeItem('checkboxes');
    navigate(`${pathname.replace(/\d+/, '1')}`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.brandsButton}
      >
        <span>Brands</span>

        {brandFilters ? (
          <img
            src={xbutton}
            alt="resetButton"
            onClick={resetBrands}
            width={9}
            className={styles.icon}
            style={{ top: '15px', cursor: 'pointer' }}
          />
        ) : (
          <img
            src={arrowIcon}
            alt="arrowIcon"
            className={styles.icon}
            style={{ top: '17px', cursor: 'auto' }}
          />
        )}
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
