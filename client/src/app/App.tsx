import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
