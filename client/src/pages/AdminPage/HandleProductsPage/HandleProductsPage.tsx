import AdminProductsList from '@widgets/Admin/AdminProductsList/AdminProductsList';
import SearchBar from '@widgets/Catalogue/ProductsPanel/SearchBar/SearchBar';

import styles from './HandleProductsPage.module.css';

const HandleProductsPage = () => {
  return (
    <div>
      <h2 className={styles.title}>Products list</h2>

      <div className={styles.search}>
        <SearchBar />
      </div>

      <AdminProductsList />
    </div>
  );
};

export default HandleProductsPage;
