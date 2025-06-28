import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useRefreshMutation } from '@shared/api/authApi';

import Header from '@widgets/Header/Header';
import UserNavigation from '@widgets/User/UserNavigation/UserNavigation';

function UserLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) refresh();
    if (!isLogged) navigate('/');
  }, [isLogged, navigate]);

  return (
    <div className="layout">
      <Header />

      <div className="container">
        <UserNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
