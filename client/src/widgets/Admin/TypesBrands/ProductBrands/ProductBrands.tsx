import { FC } from 'react';

import { IProductBrand } from '@shared/models/typesbrands';
import DeleteProductBrand from '@processes/DeleteProductBrand';

import styles from './ProductBrands.module.css';

type TProductBrands = {
  brands: IProductBrand[];
};

const ProductBrands: FC<TProductBrands> = ({ brands }) => {
  return (
    <ul className={styles.list}>
      {brands.map(({ id, name }) => {
        return (
          <li key={id} className={styles.brand}>
            <span>{name}</span>
            <DeleteProductBrand brandId={id} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductBrands;
