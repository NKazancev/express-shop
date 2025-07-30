import CreateProductBrand from '@processes/CreateProductBrand';
import CreateProductType from '@processes/CreateProductType';

import { useGetTypesQuery } from '@shared/api/typeApi';
import { useGetBrandsQuery } from '@shared/api/brandApi';

import TypesList from '@widgets/Admin/TypesBrands/ProductTypes/ProductTypes';
import BrandsList from '@widgets/Admin/TypesBrands/ProductBrands/ProductBrands';

import styles from './HandleBrandsTypesPage.module.css';

const HandleTypesBrandsPage = () => {
  const { data: types } = useGetTypesQuery();
  const { data: brands } = useGetBrandsQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Types and brands</h2>

      <div className={styles.content}>
        <CreateProductType />
        <CreateProductBrand />
        {types && <TypesList types={types} />}
        {brands && <BrandsList brands={brands} />}
      </div>
    </div>
  );
};

export default HandleTypesBrandsPage;
