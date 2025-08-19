import { useParams } from 'react-router';

import { ADMIN_PRODUCTS_PER_PAGE } from '@config/consts';
import UserRole from '@config/userRoles';

import useProducts from '@shared/hooks/useProducts';
import Pagination from '@shared/ui/Pagination/Pagination';

import AdminProductsList from '@widgets/Admin/AdminProducts/AdminProductsList/AdminProductsList';
import SearchBar from '@widgets/Catalogue/ProductsPanel/SearchBar/SearchBar';

import styles from './HandleProductsPage.module.css';

const HandleProductsPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const { products, isSuccess } = useProducts(
    currentPage,
    ADMIN_PRODUCTS_PER_PAGE,
    UserRole.ADMIN
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products list</h2>

      <div className={styles.panel}>
        <SearchBar />
        <p className={styles.total}>Number of products: {products?.quantity}</p>
      </div>

      {!!products?.quantity && isSuccess && (
        <>
          <AdminProductsList products={products.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/admin/products"
            productsQuantity={products.quantity}
            itemsPerPage={ADMIN_PRODUCTS_PER_PAGE}
          />
        </>
      )}

      {!products?.quantity && isSuccess && (
        <div className={styles.notFound}>Nothing was found</div>
      )}
    </div>
  );
};

export default HandleProductsPage;
