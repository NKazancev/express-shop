import { Route, Routes } from 'react-router';

import CheckRole from '@processes/CheckRole';
import UserRole from '@config/userRoles';

import CartLayout from '../layouts/CartLayout';

import CartPage from '@pages/CartPage/CartPage';
import CheckoutPage from '@pages/CheckoutPage/CheckoutPage';

const CartRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckRole allowedRole={UserRole.USER} redirect="/">
            <CartLayout />
          </CheckRole>
        }
      >
        <Route index element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default CartRoutes;
