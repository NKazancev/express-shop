import CreateProduct from '@processes/CreateProduct';
import CreateProductBrand from '@processes/CreateProductBrand';
import CreateProductType from '@processes/CreateProductType';

import styles from './AdminPage.module.css';

function AdminPage() {
  return (
    <div className={styles.container}>
      <CreateProduct />
      <CreateProductType />
      <CreateProductBrand />
    </div>
  );
}

export default AdminPage;
