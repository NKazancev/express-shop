import { FC } from 'react';
import toast from 'react-hot-toast';

import { useUpdateProductMutation } from '@shared/api/productApi';

import styles from './StockCounter.module.css';

type TStockCounter = {
  id: string;
  stock: number;
};

const StockCounter: FC<TStockCounter> = ({ id, stock }) => {
  const [updateProduct] = useUpdateProductMutation();

  const increaseProductStock = async () => {
    try {
      await updateProduct({ id, stock: stock + 1 }).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const decreaseProductStock = async () => {
    try {
      await updateProduct({ id, stock: stock - 1 }).unwrap();
    } catch (error) {
      toast.error('Something went wrong');
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
