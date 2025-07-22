import { useParams } from 'react-router';

import UserRole from '@config/userRoles';
import useProducts from '@shared/hooks/useProducts';

import AdminProductsList from '@widgets/Admin/AdminProducts/AdminProductsList/AdminProductsList';
import SearchBar from '@widgets/Catalogue/ProductsPanel/SearchBar/SearchBar';
import Pagination from '@widgets/Pagination/Pagination';

import styles from './HandleProductsPage.module.css';

const HandleProductsPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);
  const itemsPerPage = 10;

  const products = useProducts(currentPage, itemsPerPage, UserRole.ADMIN);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products list</h2>

      <div className={styles.panel}>
        <SearchBar />
        <p className={styles.total}>Number of products: {products?.quantity}</p>
      </div>

      {products && (
        <>
          <AdminProductsList products={products.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/admin/products"
            productsQuantity={products.quantity}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default HandleProductsPage;
