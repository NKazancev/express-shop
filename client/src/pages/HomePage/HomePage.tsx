import HomeImage from '@widgets/Header/HeaderImage/HeaderImage';
import ProductsPanel from '@widgets/Products/ProductsPanel/ProductsPanel';
import ProductsList from '@widgets/Products/ProductsList/ProductsList';

import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div>
      <div className={styles.products}>
        <ProductsPanel />
        <ProductsList />
      </div>
    </div>
  );
}

export default HomePage;
