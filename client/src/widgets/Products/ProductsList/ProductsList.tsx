import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetProductsQuery } from '@shared/api/productApi';
import { IProduct } from '@shared/models/product';
import ProductCard from '@widgets/Products/ProductCard/ProductCard';

import styles from './ProductsList.module.css';

const ProductsList = () => {
  const { searchQuery, productType, prices, brandFilters } = useAppSelector(
    (state) => state.filters
  );

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

  const productsList = products?.map((product: IProduct) => {
    return (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        description={product.description}
        image={product.image}
      />
    );
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default ProductsList;
