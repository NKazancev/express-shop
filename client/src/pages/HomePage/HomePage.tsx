import HomeImage from '@widgets/Home/HomeImage';
import ProductsPanel from '@widgets/Products/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Products/ProductsList/ProductsList';

import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div>
      <HomeImage />

      <div className={styles.products}>
        <ProductsPanel />
        <ProductsList />
      </div>
    </div>
  );
}

export default HomePage;
