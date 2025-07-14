import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import toastOptions from '@config/toastOptions';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useRefreshMutation } from '@shared/api/authApi';

function RootLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (isLogged) refresh();
  }, [isLogged]);

  return (
    <div className="root-layout">
      <Outlet />
      <Toaster toastOptions={toastOptions} />
    </div>
  );
}

export default RootLayout;
