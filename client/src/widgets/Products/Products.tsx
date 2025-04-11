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
  const [productType, setProductType] = useState<string>('All');
  const [brandFilters, setBrandFilters] = useState<string | undefined>('');
  const [prices, setPrices] = useState<number[]>([0, 300000]);

  console.log(brandFilters);

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
        <BrandFilters setBrandFilters={(data) => setBrandFilters(data)} />
      </div>

      <ProductsList products={products} />
    </div>
  );
};

export default Products;
