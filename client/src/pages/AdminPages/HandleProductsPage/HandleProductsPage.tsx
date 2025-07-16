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
  const take = 10;

  const products = useProducts(currentPage, take, UserRole.ADMIN);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products list</h2>

      <div className={styles.search}>
        <SearchBar />
      </div>

      {products && (
        <>
          <AdminProductsList products={products.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/admin/products"
            productsQuantity={products.quantity}
            take={take}
          />
        </>
      )}
    </div>
  );
};

export default HandleProductsPage;
