import { useGetBrandsQuery } from '@shared/api/brandApi';

import DeleteProductBrand from '@processes/DeleteProductBrand';

import styles from './ProductBrands.module.css';

const ProductBrands = () => {
  const { data: brands } = useGetBrandsQuery();

  return (
    <ul className={styles.list}>
      {brands?.map(({ id, name }) => {
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
