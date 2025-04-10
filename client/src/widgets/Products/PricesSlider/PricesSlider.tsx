import { FC, useState } from 'react';
import { Range } from 'react-range';

import styles from './PricesSLider.module.css';

type TPricesSlider = {
  prices: number[];
  setPrices: (values: number[]) => void;
};

const PricesSlider: FC<TPricesSlider> = ({ prices, setPrices }) => {
  const [values, setValues] = useState<number[]>(prices);

  return (
    <div>
      <div className={styles.label}>Choose price</div>

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
        onFinalChange={() => setPrices(values)}
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
