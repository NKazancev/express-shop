import { Route, Routes } from 'react-router';

import CheckRole from '@processes/CheckRole';
import UserRole from '@config/userRoles';

import AdminLayout from '../layouts/AdminLayout';

import CreateProductPage from '@pages/AdminPages/CreateProductPage/CreateProductPage';
import HandleProductsPage from '@pages/AdminPages/HandleProductsPage/HandleProductsPage';
import HandleOrdersPage from '@pages/AdminPages/HandleOrdersPage/HandleOrdersPage';
import HandleTypesBrandsPage from '@pages/AdminPages/HandleTypesBrandsPage/HandleBrandsTypesPage';
import HandleCountriesCitiesPage from '@pages/AdminPages/HandleCountriesCitiesPage/HandleCountriesCitiesPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckRole allowedRole={UserRole.ADMIN} redirect="/">
            <AdminLayout />
          </CheckRole>
        }
      >
        <Route index element={<CreateProductPage />} />
        <Route path="products" element={<HandleProductsPage />} />
        <Route path="products/page/:page" element={<HandleProductsPage />} />
        <Route path="orders" element={<HandleOrdersPage />} />
        <Route path="orders/page/:page" element={<HandleOrdersPage />} />
        <Route path="typesbrands" element={<HandleTypesBrandsPage />} />
        <Route path="countriescities" element={<HandleCountriesCitiesPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
