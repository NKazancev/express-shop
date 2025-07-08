import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { setPrices } from '@shared/slices/filtersSlice';
import Dropdown from '@shared/ui/Dropdown/Dropdown';

import PricesRange from './PricesRange/PricesRange';
import PricesInputs from './PricesInputs/PricesInputs';

import styles from './PricesSLider.module.css';

const PricesSlider = () => {
  const dispatch = useAppDispatch();
  const { prices } = useAppSelector((state) => state.filters);
  const [values, setValues] = useState<number[]>(prices);

  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  const dispatchPrices = () => {
    dispatch(setPrices(values));
    closeDropdown();
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.pricesButton}
      >
        Price
      </button>

      <Dropdown isVisible={dropdownVisible} onClose={closeDropdown}>
        <div className={styles.container}>
          <PricesRange
            values={values}
            setValues={setValues}
            minInput={minInput}
            maxInput={maxInput}
          />
          <PricesInputs
            values={values}
            setValues={setValues}
            minInput={minInput}
            maxInput={maxInput}
          />

          <button
            type="button"
            onClick={dispatchPrices}
            className={styles.button}
          >
            Apply
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default PricesSlider;
