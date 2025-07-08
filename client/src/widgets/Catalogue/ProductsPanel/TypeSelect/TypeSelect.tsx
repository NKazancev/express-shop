import { useEffect, useState } from 'react';

import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { useLazyGetTypesQuery } from '@shared/api/typeApi';
import { setProductType } from '@shared/slices/filtersSlice';
import { IProductType } from '@shared/models/typesbrands';

import Dropdown from '@shared/ui/Dropdown/Dropdown';

import styles from './TypeSelect.module.css';

const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetTypesQuery();

  const [productTypes, setProductTypes] = useState<IProductType[]>();
  const [activeType, setActiveType] = useState<string>();

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  useEffect(() => {
    if (!productTypes) {
      trigger().then((res) => {
        if (res.data) {
          setProductTypes(res.data);
          setActiveType(res.data[0].name);
          dispatch(setProductType(res.data[0].id));
        }
      });
    }
  }, [productTypes]);

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.typesButton}
      >
        {activeType}
      </button>

      <Dropdown isVisible={dropdownVisible} onClose={closeDropdown}>
        <ul className={styles.list}>
          {productTypes?.map(({ id, name }) => {
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
          })}
        </ul>
      </Dropdown>
    </div>
  );
};

export default TypeSelect;
