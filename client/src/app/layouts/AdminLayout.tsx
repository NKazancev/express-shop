import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';

import { useAppSelector } from '@shared/hooks/reduxHooks';

import Header from '@widgets/Header/Header';
import AdminNavigation from '@widgets/Admin/AdminNavigation/AdminNavigation';

function AdminLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/');
  }, [isLogged, navigate]);

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
