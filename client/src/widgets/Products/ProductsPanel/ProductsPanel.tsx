import { useState } from 'react';

import TypeSelect from './TypeSelect/TypeSelect';
import BrandFilters from './BrandFilters/BrandFilters';
import PricesSlider from './PricesSlider/PricesSlider';
import SearchBar from './SearchBar/SearchBar';

import styles from './ProductsPanel.module.css';

const ProductsPanel = () => {
  const [brandsVisible, setBrandsVisible] = useState<boolean>(false);
  const [pricesVisible, setPricesVisible] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <TypeSelect />

        <div className={styles.brands}>
          <button
            type="button"
            onClick={() => setBrandsVisible((prev) => !prev)}
            className={styles.button}
          >
            Brands
          </button>
          <div className={brandsVisible ? styles.visible : styles.hidden}>
            <BrandFilters />
          </div>
        </div>

        <div className={styles.prices}>
          <button
            type="button"
            onClick={() => setPricesVisible((prev) => !prev)}
            className={styles.button}
          >
            Price
          </button>
          <div className={pricesVisible ? styles.visible : styles.hidden}>
            <PricesSlider />
          </div>
        </div>
      </div>

      <SearchBar />
    </div>
  );
};

export default ProductsPanel;
