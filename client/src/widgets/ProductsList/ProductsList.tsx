import { useGetProductsQuery } from '../../shared/api/productApi';
import { IProduct } from '../../shared/models/product';
import ProductCard from '../ProductCard/ProductCard';

import styles from './ProductsList.module.css';

const ProductsList = () => {
  const { data: products } = useGetProductsQuery();

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
