import { Route, Routes } from 'react-router';

import CheckRole from '@processes/CheckRole';
import UserRole from '@config/userRoles';

import UserLayout from '../layouts/UserLayout';

import UserInfoPage from '@pages/UserPages/UserInfoPage/UserInfoPage';
import UserOrdersPage from '@pages/UserPages/UserOrdersPage/UserOrdersPage';
import UserReviewsPage from '@pages/UserPages/UserReviewsPage/UserReviewsPage';

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckRole allowedRole={UserRole.USER} redirect="/">
            <UserLayout />
          </CheckRole>
        }
      >
        <Route index element={<UserInfoPage />} />
        <Route path="orders" element={<UserOrdersPage />} />
        <Route path="reviews" element={<UserReviewsPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
