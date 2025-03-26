import { Outlet } from 'react-router';
import Header from '../widgets/Header/Header';

function Layout() {
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
