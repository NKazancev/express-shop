import { Routes, Route } from 'react-router';

import Layout from './Layout';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} index />
      </Route>
    </Routes>
  );
}

export default App;
