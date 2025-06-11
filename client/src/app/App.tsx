import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import CartLayout from './layouts/CartLayout';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

import HomePage from '@pages/HomePage/HomePage';
import ProductPage from '@pages/ProductPage/ProductPage';
import CartPage from '@pages/CartPage/CartPage';
import CheckoutPage from '@pages/CheckoutPage/CheckoutPage';
import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';
import CreateProductPage from '@pages/AdminPages/CreateProductPage/CreateProductPage';
import HandleOrdersPage from '@pages/AdminPages/HandleOrdersPage/HandleOrdersPage';
import HandleProductsPage from '@pages/AdminPages/HandleProductsPage/HandleProductsPage';
import HandleTypesBrandsPage from '@pages/AdminPages/HandleTypesBrandsPage/HandleBrandsTypesPage';
import HandleCountriesCitiesPage from '@pages/AdminPages/HandleCountriesCitiesPage/HandleCountriesCitiesPage';
import UserInfoPage from '@pages/UserPages/UserInfoPage/UserInfoPage';
import UserOrdersPage from '@pages/UserPages/UserOrdersPage/UserOrdersPage';
import UserReviewsPage from '@pages/UserPages/UserReviewsPage/UserReviewsPage';

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

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserInfoPage />} />
        <Route path="orders" element={<UserOrdersPage />} />
        <Route path="reviews" element={<UserReviewsPage />} />
      </Route>

      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
