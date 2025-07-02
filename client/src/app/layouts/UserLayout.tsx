import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';
import UserNavigation from '@widgets/User/UserNavigation/UserNavigation';

function UserLayout() {
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
