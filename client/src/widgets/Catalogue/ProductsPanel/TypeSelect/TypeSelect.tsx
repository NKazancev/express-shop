import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { setProductType } from '@shared/slices/filtersSlice';

import Dropdown from '@shared/ui/Dropdown/Dropdown';

import styles from './TypeSelect.module.css';

const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: productTypes } = useGetTypesQuery();
  const { productType } = useAppSelector((state) => state.filters);

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  const typesList = productTypes?.map(({ id, name }) => {
    return (
      <li key={id}>
        <button
          type="button"
          onClick={() => {
            dispatch(setProductType({ id, name }));
            localStorage.setItem('productType', JSON.stringify({ id, name }));
            setDropdownVisible(false);
            navigate(`${pathname.replace(/\d+/, '1')}`);
          }}
          className={styles.listButton}
        >
          {name}
        </button>
      </li>
    );
  });

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.typesButton}
      >
        {!productType.name ? 'All products' : productType.name}
      </button>

      <Dropdown isVisible={dropdownVisible} onClose={closeDropdown}>
        <ul className={styles.list}>{typesList}</ul>
      </Dropdown>
    </div>
  );
};

export default TypeSelect;
