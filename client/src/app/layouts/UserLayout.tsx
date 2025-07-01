import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';

import { useAppSelector } from '@shared/hooks/reduxHooks';

import Header from '@widgets/Header/Header';
import UserNavigation from '@widgets/User/UserNavigation/UserNavigation';

function UserLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/');
  }, [isLogged, navigate]);

  return (
    <div>
      <Header />
      <div className="container">
        <UserNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
