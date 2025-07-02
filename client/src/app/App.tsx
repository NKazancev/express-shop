import { Routes, Route } from 'react-router';

import RootLayout from './layouts/RootLayout';

import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import CartRoutes from './routes/CartRoutes';
import MainRoutes from './routes/MainRoutes';

import RegistrationPage from '@pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="user/*" element={<UserRoutes />} />
        <Route path="cart/*" element={<CartRoutes />} />

        <Route path="registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
