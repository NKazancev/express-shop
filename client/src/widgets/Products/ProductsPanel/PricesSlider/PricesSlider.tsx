import { useState } from 'react';
import { Range } from 'react-range';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { setPrices } from '../../../../shared/slices/filtersSlice';

import styles from './PricesSLider.module.css';

const PricesSlider = () => {
  const { prices } = useAppSelector((state) => state.filters);
  const [values, setValues] = useState<number[]>(prices);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>

      <Range
        label="Price"
        step={1000}
        min={0}
        max={300000}
        values={values}
        onChange={(values) => setValues(values)}
        onFinalChange={() => dispatch(setPrices(values))}
        renderTrack={({ props, children, isDragged }) => (
          <div
            {...props}
            className={styles.track}
            style={{ cursor: isDragged ? 'pointer' : 'auto' }}
          >
            <div className={styles.track_body}></div>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className={styles.thumb}
            style={{
              ...props.style,
              cursor: 'pointer',
            }}
          />
        )}
      />
    </div>
  );
};

export default PricesSlider;
