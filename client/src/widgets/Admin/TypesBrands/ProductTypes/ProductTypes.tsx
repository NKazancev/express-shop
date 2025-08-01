import { FC } from 'react';

import DeleteProductType from '@processes/Admin/DeleteProductType';
import { IProductType } from '@shared/models/typesbrands';

import styles from './ProductTypes.module.css';

type TProductTypes = {
  types: IProductType[];
};

const ProductTypes: FC<TProductTypes> = ({ types }) => {
  return (
    <ul className={styles.list}>
      {types.map(({ id, name }) => {
        return (
          <li key={id} className={styles.type}>
            <span>{name}</span>
            <DeleteProductType typeId={id} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductTypes;
