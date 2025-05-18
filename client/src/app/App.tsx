import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import CartLayout from './layouts/CartLayout';

import HomePage from '@pages/HomePage/HomePage';
import ProductPage from '@pages/ProductPage/ProductPage';
import CartPage from '@pages/CartPage/CartPage';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import CreateProductPage from '@pages/AdminPage/CreateProductPage/CreateProductPage';
import HandleProductsPage from '@pages/AdminPage/HandleProductsPage/HandleProductsPage';
import HandleTypesPage from '@pages/AdminPage/HandleTypesPage/HandleTypesPage';
import HandleBrandsPage from '@pages/AdminPage/HandleBrandsPage/HandleBrandsPage';
import CheckoutPage from '@pages/CheckoutPage/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductPage />} />
      </Route>

      <Route path="/cart" element={<CartLayout />}>
        <Route index element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<HandleProductsPage />} />
        <Route path="create" element={<CreateProductPage />} />
        <Route path="types" element={<HandleTypesPage />} />
        <Route path="brands" element={<HandleBrandsPage />} />
      </Route>

      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
