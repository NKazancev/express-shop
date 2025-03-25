import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
