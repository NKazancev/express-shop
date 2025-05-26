import CreateProductBrand from '@processes/CreateProductBrand';
import CreateProductType from '@processes/CreateProductType';

import styles from './HandleBrandsTypesPage.module.css';

const HandleTypesBrandsPage = () => {
  return (
    <div className={styles.container}>
      <CreateProductType />
      <CreateProductBrand />
    </div>
  );
};

export default HandleTypesBrandsPage;
