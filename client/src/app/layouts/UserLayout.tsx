import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';
import UserNavigation from '@widgets/User/UserNavigation/UserNavigation';

function UserLayout() {
  return (
    <div className="user-layout layout">
      <Header />
      <div className="sidebar-container">
        <UserNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
