import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useRefreshMutation } from '@shared/api/authApi';
import Header from '@widgets/Header/Header';
import HeaderImage from '@widgets/Header/HeaderImage/HeaderImage';

function MainLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (isLogged) refresh();
  }, [isLogged]);

  return (
    <div className="layout">
      <Header />
      <HeaderImage />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
