import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import CartLayout from './layouts/CartLayout';

import HomePage from '@pages/HomePage/HomePage';
import ProductPage from '@pages/ProductPage/ProductPage';
import CartPage from '@pages/CartPage/CartPage';
import CheckoutPage from '@pages/CheckoutPage/CheckoutPage';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import CreateProductPage from '@pages/AdminPage/CreateProductPage/CreateProductPage';
import HandleOrdersPage from '@pages/AdminPage/HandleOrdersPage/HandleOrdersPage';
import HandleProductsPage from '@pages/AdminPage/HandleProductsPage/HandleProductsPage';
import HandleTypesBrandsPage from '@pages/AdminPage/HandleTypesBrandsPage/HandleBrandsTypesPage';
import HandleCountriesCitiesPage from '@pages/AdminPage/HandleCountriesCitiesPage/HandleCountriesCitiesPage';

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
        <Route index element={<CreateProductPage />} />
        <Route path="products" element={<HandleProductsPage />} />
        <Route path="orders" element={<HandleOrdersPage />} />
        <Route path="typesbrands" element={<HandleTypesBrandsPage />} />
        <Route path="countriescities" element={<HandleCountriesCitiesPage />} />
      </Route>

      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
