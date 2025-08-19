import { useParams } from 'react-router';

import { CATALOGUE_PRODUCTS_PER_PAGE } from '@config/consts';
import UserRole from '@config/userRoles';

import useProducts from '@shared/hooks/useProducts';
import Pagination from '@shared/ui/Pagination/Pagination';

import ProductsPanel from '@widgets/Catalogue/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Catalogue/ProductsList/ProductsList';

import styles from './HomePage.module.css';

function HomePage() {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const { products, isSuccess } = useProducts(
    currentPage,
    CATALOGUE_PRODUCTS_PER_PAGE,
    UserRole.USER
  );

  return (
    <div className={styles.products}>
      <ProductsPanel />

      {!!products?.quantity && isSuccess && (
        <>
          <ProductsList items={products.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/products"
            productsQuantity={products.quantity}
            itemsPerPage={CATALOGUE_PRODUCTS_PER_PAGE}
          />
        </>
      )}

      {!products?.quantity && isSuccess && (
        <div className={styles.notFound}>Nothing was found</div>
      )}
    </div>
  );
}

export default HomePage;
