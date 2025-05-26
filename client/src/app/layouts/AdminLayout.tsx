import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useRefreshMutation } from '@shared/api/authApi';

import Header from '@widgets/Header/Header';
import AdminNavigation from '@widgets/Admin/AdminNavigation/AdminNavigation';

function AdminLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (isLogged) refresh();
  }, [isLogged]);

  return (
    <div className="layout">
      <Header />

      <div className="admin-container">
        <AdminNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
