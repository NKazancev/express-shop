import { useState } from 'react';

import TypeSelect from './TypeSelect/TypeSelect';
import BrandFilters from './BrandFilters/BrandFilters';
import PricesSlider from './PricesSlider/PricesSlider';
import SearchBar from './SearchBar/SearchBar';
import Dropdown from '@shared/ui/Dropdown/Dropdown';

import styles from './ProductsPanel.module.css';

const ProductsPanel = () => {
  const [brandsVisible, setBrandsVisible] = useState<boolean>(false);
  const [pricesVisible, setPricesVisible] = useState<boolean>(false);

  const toggleBrands = () => setBrandsVisible((prev) => !prev);
  const togglePrices = () => setPricesVisible((prev) => !prev);
  const closeBrands = () => setBrandsVisible(false);
  const closePrices = () => setPricesVisible(false);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <TypeSelect />

        <div>
          <button
            type="button"
            onClick={toggleBrands}
            className={styles.button}
          >
            Brands
          </button>
          <Dropdown isVisible={brandsVisible} onClose={closeBrands}>
            <BrandFilters />
          </Dropdown>
        </div>

        <div>
          <button
            type="button"
            onClick={togglePrices}
            className={styles.button}
          >
            Price
          </button>
          <Dropdown isVisible={pricesVisible} onClose={closePrices}>
            <PricesSlider onClose={closePrices} />
          </Dropdown>
        </div>
      </div>

      <SearchBar />
    </div>
  );
};

export default ProductsPanel;
