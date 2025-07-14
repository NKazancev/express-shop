import { Route, Routes } from 'react-router';

import MainLayout from '../layouts/MainLayout';
import HomePage from '@pages/HomePage/HomePage';
import ProductPage from '@pages/ProductPage/ProductPage';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/page/:page" element={<HomePage />} />
        <Route path="products/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
