import CreateProductBrand from '@processes/CreateProductBrand';
import CreateProductType from '@processes/CreateProductType';
import TypesList from '@widgets/Admin/TypesBrands/ProductTypes/ProductTypes';
import BrandsList from '@widgets/Admin/TypesBrands/ProductBrands/ProductBrands';

import styles from './HandleBrandsTypesPage.module.css';

const HandleTypesBrandsPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Types and brands</h2>

      <div className={styles.content}>
        <CreateProductType />
        <CreateProductBrand />
        <TypesList />
        <BrandsList />
      </div>
    </div>
  );
};

export default HandleTypesBrandsPage;
