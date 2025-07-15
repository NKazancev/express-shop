import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';

function CartLayout() {
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
