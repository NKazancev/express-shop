import { MouseEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { MAX_PRICE, MIN_PRICE } from '@config/consts';

import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { setPrices } from '@shared/slices/filtersSlice';
import Dropdown from '@shared/ui/Dropdown/Dropdown';

import PricesRange from './PricesRange/PricesRange';
import PricesInputs from './PricesInputs/PricesInputs';

import arrowIcon from '@shared/assets/arrow.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './PricesSlider.module.css';

const PricesSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { prices } = useAppSelector((state) => state.filters);

  const [values, setValues] = useState<number[]>(prices);

  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const closeDropdown = () => setDropdownVisible(false);

  const dispatchPrices = () => {
    dispatch(setPrices(values));
    localStorage.setItem('prices', JSON.stringify(values));
    closeDropdown();
    navigate(`${pathname.replace(/\d+/, '1')}`);
    if (
      values[0] === MIN_PRICE &&
      values[1] === MAX_PRICE &&
      minInput.current &&
      maxInput.current
    ) {
      minInput.current.value = '';
      maxInput.current.value = '';
      localStorage.removeItem('prices');
    }
  };

  const resetPrices = (e: MouseEvent) => {
    e.stopPropagation();
    if (minInput.current && maxInput.current) {
      minInput.current.value = '';
      maxInput.current.value = '';
    }
    dispatch(setPrices([MIN_PRICE, MAX_PRICE]));
    setValues([MIN_PRICE, MAX_PRICE]);
    localStorage.removeItem('prices');
    navigate(`${pathname.replace(/\d+/, '1')}`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={styles.pricesButton}
      >
        <span>Price</span>

        {(prices[0] !== MIN_PRICE || prices[1] !== MAX_PRICE) && (
          <img
            src={xbutton}
            alt="resetButton"
            onClick={resetPrices}
            width={9}
            className={styles.icon}
            style={{ top: '15px', cursor: 'pointer' }}
          />
        )}
        {prices[0] === MIN_PRICE && prices[1] === MAX_PRICE && (
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
