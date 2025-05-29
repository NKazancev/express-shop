import { FC } from 'react';

import styles from './StockCounter.module.css';

type TStockCounter = {
  id: string;
};

const StockCounter: FC<TStockCounter> = () => {
  return (
    <div className={styles.counter}>
      <button type="button" className={styles.button}>
        <span>+</span>
      </button>

      <span className={styles.stock}>1</span>

      <button type="button" className={styles.button}>
        <span>-</span>
      </button>
    </div>
  );
};

export default StockCounter;
