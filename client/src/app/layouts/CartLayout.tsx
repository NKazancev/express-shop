import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useRefreshMutation } from '@shared/api/authApi';

import Header from '@widgets/Header/Header';

function CartLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (isLogged) refresh();
  }, [isLogged]);

  return (
    <div className="layout">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CartLayout;
