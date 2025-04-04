import { FC, useState } from 'react';
import styles from './ProductsFilters.module.css';

type TProductsFilters = {
  setSearchQuery: (searchValue: string) => void;
};

const ProductsFilters: FC<TProductsFilters> = ({ setSearchQuery }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        autoComplete="off"
        className={styles.input}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button
        type="button"
        className={styles.button}
        onClick={() => setSearchQuery(searchValue)}
      >
        Search
      </button>
    </div>
  );
};

export default ProductsFilters;
