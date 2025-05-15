import useProducts from '@shared/hooks/useProducts';
import { IProduct } from '@shared/models/product';
import ProductCard from '@widgets/Catalogue/ProductCard/ProductCard';

import styles from './ProductsList.module.css';

const ProductsList = () => {
  const products = useProducts();

  const productsList = products?.map((product: IProduct) => {
    return <ProductCard key={product.id} {...product} />;
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default ProductsList;
