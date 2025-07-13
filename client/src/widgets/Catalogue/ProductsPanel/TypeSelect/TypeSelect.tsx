import { useState } from 'react';

import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { setProductType } from '@shared/slices/filtersSlice';

import Dropdown from '@shared/ui/Dropdown/Dropdown';

import styles from './TypeSelect.module.css';

const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const { data: productTypes } = useGetTypesQuery();
  const [activeType, setActiveType] = useState<string>('');

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  const typesList = productTypes?.map(({ id, name }) => {
    return (
      <li key={id}>
        <button
          type="button"
          onClick={() => {
            dispatch(setProductType(id));
            setActiveType(name);
            setDropdownVisible(false);
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
        {activeType === '' ? 'All products' : activeType}
      </button>

      <Dropdown isVisible={dropdownVisible} onClose={closeDropdown}>
        <ul className={styles.list}>{typesList}</ul>
      </Dropdown>
    </div>
  );
};

export default TypeSelect;
