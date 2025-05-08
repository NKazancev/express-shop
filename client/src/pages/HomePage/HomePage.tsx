import ProductsPanel from '@widgets/Catalogue/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Catalogue/ProductsList/ProductsList';

import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.products}>
      <ProductsPanel />
      <ProductsList />
    </div>
  );
}

export default HomePage;
