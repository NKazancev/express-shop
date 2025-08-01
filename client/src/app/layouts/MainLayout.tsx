import { Outlet } from 'react-router';

import Header from '@widgets/Header/Header';
import HeaderImage from '@widgets/Header/HeaderImage/HeaderImage';

function MainLayout() {
  return (
    <div className="main-layout layout">
      <Header />
      <HeaderImage />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
