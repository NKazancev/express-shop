import { useParams } from 'react-router';

import useProducts from '@shared/hooks/useProducts';

import ProductsPanel from '@widgets/Catalogue/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Catalogue/ProductsList/ProductsList';
import Pagination from '@widgets/Pagination/Pagination';

import styles from './HomePage.module.css';

function HomePage() {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);
  const take = 8;

  const products = useProducts(currentPage, take);

  return (
    <div className={styles.products}>
      <ProductsPanel />

      {products && (
        <>
          <ProductsList products={products.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/products"
            productsQuantity={products.quantity}
            take={take}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
