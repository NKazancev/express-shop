import { FC, useRef, useState } from 'react';
import { Range } from 'react-range';

import { MIN_PRICE, MAX_PRICE } from '@config/consts';

import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';
import { setPrices } from '@shared/slices/filtersSlice';
import PricesInputs from './PricesInputs/PricesInputs';

import styles from './PricesSLider.module.css';

type TPricesSlider = {
  onClose: () => void;
};

const PricesSlider: FC<TPricesSlider> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const { prices } = useAppSelector((state) => state.filters);
  const [values, setValues] = useState<number[]>(prices);
  const trackPrices = [values[0], Math.max(values[0], values[1])];

  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);

  const handleTrackPrices = (values: number[]) => {
    if (minInput.current && maxInput.current) {
      minInput.current.value = String(values[0]);
      maxInput.current.value = String(values[1]);
      setValues([
        Number(minInput.current.value),
        Number(maxInput.current.value),
      ]);
    }
  };

  const dispatchPrices = () => {
    dispatch(setPrices(values));
    onClose();
  };

  return (
    <div className={styles.container}>
      <Range
        label="Price"
        step={MIN_PRICE}
        min={MIN_PRICE}
        max={MAX_PRICE}
        values={trackPrices}
        onChange={handleTrackPrices}
        renderTrack={({ props, children, isDragged }) => (
          <div
            {...props}
            className={styles.track}
            style={{ cursor: isDragged ? 'pointer' : 'auto' }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className={styles.thumb}
            style={{ ...props.style }}
          />
        )}
      />

      <PricesInputs
        values={values}
        setValues={setValues}
        minInput={minInput}
        maxInput={maxInput}
      />

      <button type="button" onClick={dispatchPrices} className={styles.button}>
        Apply
      </button>
    </div>
  );
};

export default PricesSlider;
