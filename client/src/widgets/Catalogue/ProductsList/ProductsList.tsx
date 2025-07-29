import { FC } from 'react';

import { IProductsResponse } from '@shared/models/product';
import ProductCard from '@widgets/Catalogue/ProductCard/ProductCard';

import styles from './ProductsList.module.css';

type TProductsList = Pick<IProductsResponse, 'data'>;

const ProductsList: FC<TProductsList> = ({ data }) => {
  const productsList = data?.map((product) => {
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
