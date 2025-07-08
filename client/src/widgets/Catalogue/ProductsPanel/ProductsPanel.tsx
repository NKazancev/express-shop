import TypeSelect from './TypeSelect/TypeSelect';
import BrandFilters from './BrandFilters/BrandFilters';
import PricesSlider from './PricesSlider/PricesSlider';
import SearchBar from './SearchBar/SearchBar';

import styles from './ProductsPanel.module.css';

const ProductsPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <TypeSelect />
        <BrandFilters />
        <PricesSlider />
      </div>

      <SearchBar />
    </div>
  );
};

export default ProductsPanel;
