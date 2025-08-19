import { Route, Routes } from 'react-router';

import UserRole from '@config/userRoles';
import CheckRole from '@processes/CheckRole';
import RedirectRoute from '@processes/RedirectRoute';

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

        <Route path="*" element={<RedirectRoute redirect="cart" />} />
      </Route>
    </Routes>
  );
};

export default CartRoutes;
