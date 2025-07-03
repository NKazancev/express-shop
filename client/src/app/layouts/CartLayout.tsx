import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';

function CartLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CartLayout;
