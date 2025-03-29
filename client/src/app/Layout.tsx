import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppSelector } from '../shared/hooks/reduxHooks';
import { useRefreshMutation } from '../shared/api/authApi';
import Header from '../widgets/Header/Header';

function Layout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (isLogged) refresh();
  }, [isLogged]);

  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
