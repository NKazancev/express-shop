import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';
import AdminNavigation from '@widgets/Admin/AdminNavigation/AdminNavigation';

function AdminLayout() {
  return (
    <div className="admin-layout layout">
      <Header />
      <div className="sidebar-container">
        <AdminNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
