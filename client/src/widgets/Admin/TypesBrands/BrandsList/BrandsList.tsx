import { useGetBrandsQuery } from '@shared/api/brandApi';
import ProductBrand from '../ProductBrand/ProductBrand';

import styles from './BrandsList.module.css';

const BrandsList = () => {
  const { data: brands } = useGetBrandsQuery();

  return (
    <ul className={styles.list}>
      {brands?.map(({ id, name }) => {
        return <ProductBrand key={id} id={id} name={name} />;
      })}
    </ul>
  );
};

export default BrandsList;
