import {
  FC,
  RefObject,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { MIN_PRICE, MAX_PRICE } from '@config/consts';

import styles from './PricesInputs.module.css';

type TPricesInputs = {
  values: number[];
  setValues: Dispatch<SetStateAction<number[]>>;
  minInput: RefObject<HTMLInputElement | null>;
  maxInput: RefObject<HTMLInputElement | null>;
};

const PricesInputs: FC<TPricesInputs> = (props) => {
  const { values, setValues, minInput, maxInput } = props;

  const minPrice = values[0];
  const maxPrice = values[1];

  useEffect(() => {
    if (minPrice === 0 && maxPrice === 0) {
      setValues([MIN_PRICE, MAX_PRICE]);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (minInput.current && maxInput.current) {
      if (minPrice !== MIN_PRICE || maxPrice !== MAX_PRICE) {
        minInput.current.value = String(minPrice);
        maxInput.current.value = String(maxPrice);
      }
    }
  }, []);

  const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setAttribute('value', String(minPrice));
    const value = Number(e.target.value);
    setValues([value, maxPrice]);
    if (value > MAX_PRICE) setValues([MAX_PRICE, maxPrice]);
  };

  const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setAttribute('value', String(maxPrice));
    const value = Number(e.target.value);
    setValues([minPrice, value]);
    if (value > MAX_PRICE) setValues([minPrice, MAX_PRICE]);
  };

  return (
    <div className={styles.inputs}>
      <label htmlFor="min-price" className={styles.label}>
        <span>Min price</span>
        <input
          type="number"
          id="min-price"
          min={MIN_PRICE}
          ref={minInput}
          onChange={handleMinPrice}
          placeholder={String(MIN_PRICE)}
          className={styles.input}
        />
      </label>
      <label htmlFor="max-price" className={styles.label}>
        <span>Max price</span>
        <input
          type="number"
          id="max-price"
          max={MAX_PRICE}
          ref={maxInput}
          onChange={handleMaxPrice}
          placeholder={String(MAX_PRICE)}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default PricesInputs;
