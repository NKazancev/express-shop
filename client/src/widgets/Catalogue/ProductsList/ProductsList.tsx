import { FC } from 'react';

import { IProduct } from '@shared/models/product';
import ProductCard from '@widgets/Catalogue/ProductCard/ProductCard';

import styles from './ProductsList.module.css';

type TProductsList = {
  products: IProduct[];
};

const ProductsList: FC<TProductsList> = ({ products }) => {
  const productsList = products?.map((product: IProduct) => {
    return <ProductCard key={product.id} {...product} />;
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default ProductsList;
