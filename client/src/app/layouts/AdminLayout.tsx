import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';
import AdminNavigation from '@widgets/Admin/AdminNavigation/AdminNavigation';

function AdminLayout() {
  return (
    <div>
      <Header />
      <div className="container">
        <AdminNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
