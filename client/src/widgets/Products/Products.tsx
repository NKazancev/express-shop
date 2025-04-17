import { useState } from 'react';

import { useGetProductsQuery } from '../../shared/api/productApi';
import SearchBar from './SearchBar/SearchBar';
import TypeSelect from './TypeSelect/TypeSelect';
import PricesSlider from './PricesSlider/PricesSlider';
import BrandFilters from './BrandFilters/BrandFilters';
import ProductsList from './ProductsList/ProductsList';

import styles from './Products.module.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productType, setProductType] = useState<string>('');
  const [brandFilters, setBrandFilters] = useState<string>('');
  const [prices, setPrices] = useState<number[]>([0, 300000]);

  const [brandsVisible, setBrandsVisible] = useState<boolean>(false);
  const [pricesVisible, setPricesVisible] = useState<boolean>(false);

  const { data: products } = useGetProductsQuery(
    {
      searchQuery,
      productType,
      brandFilters,
      minPrice: prices[0],
      maxPrice: prices[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.filters}>
          <TypeSelect setProductType={(data) => setProductType(data)} />

          <div className={styles.brands}>
            <button
              type="button"
              onClick={() => setBrandsVisible((prev) => !prev)}
              className={styles.button}
            >
              Brands
            </button>
            {brandsVisible && (
              <BrandFilters setBrandFilters={(data) => setBrandFilters(data)} />
            )}
          </div>

          <div className={styles.prices}>
            <button
              type="button"
              onClick={() => setPricesVisible((prev) => !prev)}
              className={styles.button}
            >
              Price
            </button>
            {pricesVisible && (
              <PricesSlider
                prices={prices}
                setPrices={(data) => setPrices(data)}
              />
            )}
          </div>
        </div>

        <SearchBar setSearchQuery={(data) => setSearchQuery(data)} />
      </div>

      <ProductsList products={products} />
    </div>
  );
};

export default Products;
