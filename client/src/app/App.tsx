import { Routes, Route } from 'react-router';

import Layout from './Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} index />

        <Route path="/login" element={<LoginPage />} index />
        <Route path="/registration" element={<RegistrationPage />} index />
      </Route>
    </Routes>
  );
}

export default App;
