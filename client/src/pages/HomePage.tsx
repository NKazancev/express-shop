import HomeImage from '../widgets/Home/HomeImage';
import ProductsPanel from '../widgets/Products/ProductsPanel/ProductsPanel';
import ProductsList from '../widgets/Products/ProductsList/ProductsList';

function HomePage() {
  return (
    <div>
      <HomeImage />

      <div style={{ padding: '24px 0' }}>
        <ProductsPanel />
        <ProductsList />
      </div>
    </div>
  );
}

export default HomePage;
