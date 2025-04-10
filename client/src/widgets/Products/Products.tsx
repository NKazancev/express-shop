import { useState } from 'react';

import { useGetProductsQuery } from '../../shared/api/productApi';
import SearchBar from './SearchBar/SearchBar';
import TypeSelect from './TypeSelect/TypeSelect';
import PricesSlider from './PricesSlider/PricesSlider';
import ProductsList from './ProductsList/ProductsList';

import styles from './Products.module.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productType, setProductType] = useState<string>('All');
  const [prices, setPrices] = useState<number[]>([0, 300000]);

  const { data: products } = useGetProductsQuery(
    {
      searchQuery,
      productType,
      minPrice: prices[0],
      maxPrice: prices[1],
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SearchBar setSearchQuery={(data) => setSearchQuery(data)} />
        <TypeSelect setProductType={(data) => setProductType(data)} />
        <PricesSlider prices={prices} setPrices={(data) => setPrices(data)} />
      </div>

      <ProductsList products={products} />
    </div>
  );
};

export default Products;
