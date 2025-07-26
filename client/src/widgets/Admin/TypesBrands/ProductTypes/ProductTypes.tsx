import { useGetTypesQuery } from '@shared/api/typeApi';

import DeleteProductType from '@processes/DeleteProductType';

import styles from './ProductTypes.module.css';

const ProductTypes = () => {
  const { data: types } = useGetTypesQuery();

  return (
    <ul className={styles.list}>
      {types?.map(({ id, name }) => {
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
