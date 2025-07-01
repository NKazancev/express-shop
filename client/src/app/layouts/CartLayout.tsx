import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';

import { useAppSelector } from '@shared/hooks/reduxHooks';

import Header from '@widgets/Header/Header';

function CartLayout() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/');
  }, [isLogged, navigate]);

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
