import { useGetProductsQuery } from '../../shared/api/productApi';

import ProductsFilters from './ProductsFilters/ProductsFilters';
import ProductsList from './ProductsList/ProductsList';

import styles from './Products.module.css';
import { useState } from 'react';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: products } = useGetProductsQuery({ searchQuery });

  return (
    <div className={styles.container}>
      <ProductsFilters setSearchQuery={(data) => setSearchQuery(data)} />
      <ProductsList products={products} />
    </div>
  );
};

export default Products;
