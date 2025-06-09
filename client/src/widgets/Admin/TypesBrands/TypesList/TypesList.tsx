import { useGetTypesQuery } from '@shared/api/typeApi';
import ProductType from '../ProductType/ProductType';

import styles from './TypesList.module.css';

const TypesList = () => {
  const { data: types } = useGetTypesQuery();

  return (
    <ul className={styles.list}>
      {types?.map(({ id, name }) => {
        return <ProductType key={id} id={id} name={name} />;
      })}
    </ul>
  );
};

export default TypesList;
