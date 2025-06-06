import { FC } from 'react';

import { useUpdateProductInfoMutation } from '@shared/api/productApi';

import styles from './StockCounter.module.css';

type TStockCounter = {
  id: string;
  stock: number;
};

const StockCounter: FC<TStockCounter> = ({ id, stock }) => {
  const [updateProduct] = useUpdateProductInfoMutation();

  const increaseProductStock = async () => {
    try {
      await updateProduct({ id, stock: stock + 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseProductStock = async () => {
    try {
      await updateProduct({ id, stock: stock - 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.counter}>
      <button
        type="button"
        onClick={increaseProductStock}
        className={styles.button}
      >
        <span>+</span>
      </button>

      <span className={styles.stock}>{stock}</span>

      <button
        type="button"
        onClick={decreaseProductStock}
        disabled={stock === 0}
        className={styles.button}
      >
        <span>-</span>
      </button>
    </div>
  );
};

export default StockCounter;
