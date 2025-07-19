import { useParams } from 'react-router';

import UserRole from '@config/userRoles';
import useProducts from '@shared/hooks/useProducts';

import ProductsPanel from '@widgets/Catalogue/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Catalogue/ProductsList/ProductsList';
import Pagination from '@widgets/Pagination/Pagination';

import styles from './HomePage.module.css';

function HomePage() {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);
  const itemsPerPage = 8;

  const products = useProducts(currentPage, itemsPerPage, UserRole.USER);

  return (
    <div className={styles.products}>
      <ProductsPanel />

      {products?.data.length ? (
        <>
          <ProductsList products={products.data} />

          <Pagination
            currentPage={currentPage}
            currentLocation="/products"
            productsQuantity={products.quantity}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : null}
    </div>
  );
}

export default HomePage;
