import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import CartLayout from './layouts/CartLayout';

import HomePage from '../pages/HomePage/HomePage';
import ProductPage from '../pages/ProductPage/ProductPage';
import CartPage from '../pages/CartPage/CartPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import AdminPage from '../pages/AdminPage/AdminPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>

      <Route element={<CartLayout />}>
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
