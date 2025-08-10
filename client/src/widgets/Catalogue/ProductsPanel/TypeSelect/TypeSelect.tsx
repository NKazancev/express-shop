import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { setProductType } from '@shared/slices/filtersSlice';

import Dropdown from '@shared/ui/Dropdown/Dropdown';

import arrowIcon from '@shared/assets/arrow.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './TypeSelect.module.css';

const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { productType } = useAppSelector((state) => state.filters);
  const { data: productTypes } = useGetTypesQuery();

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  const resetProductType = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setProductType({ id: '', name: '' }));
    localStorage.removeItem('productType');
    closeDropdown();
    navigate(`${pathname.replace(/\d+/, '1')}`);
  };

  const typesList = productTypes?.map(({ id, name }) => {
    return (
      <li key={id}>
        <button
          type="button"
          className={styles.listButton}
          onClick={() => {
            dispatch(setProductType({ id, name }));
            localStorage.setItem('productType', JSON.stringify({ id, name }));
            closeDropdown();
            navigate(`${pathname.replace(/\d+/, '1')}`);
          }}
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
        {!productType.name ? (
          <span>All products</span>
        ) : (
          <span>{productType.name}</span>
        )}

        {productType.name ? (
          <img
            src={xbutton}
            alt="resetButton"
            onClick={resetProductType}
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
        <ul className={styles.list}>{typesList}</ul>
      </Dropdown>
    </div>
  );
};

export default TypeSelect;
