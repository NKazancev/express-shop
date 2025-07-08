import { Dispatch, FC, RefObject, SetStateAction } from 'react';
import { Range } from 'react-range';

import { MIN_PRICE, MAX_PRICE } from '@config/consts';

import styles from './PricesRange.module.css';

type TPricesRange = {
  values: number[];
  setValues: Dispatch<SetStateAction<number[]>>;
  minInput: RefObject<HTMLInputElement | null>;
  maxInput: RefObject<HTMLInputElement | null>;
};

const PricesRange: FC<TPricesRange> = (props) => {
  const { values, setValues, minInput, maxInput } = props;

  const trackPrices = [values[0], Math.max(values[0], values[1])];

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

  return (
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
  );
};

export default PricesRange;
