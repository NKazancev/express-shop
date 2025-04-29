import { Routes, Route } from 'react-router';

import Layout from './Layout';
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from '../pages/ProductPage/ProductPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>

      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
