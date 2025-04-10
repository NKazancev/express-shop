import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '../shared/hooks/reduxHooks';
import LoginUser from '../processes/LoginUser';

function LoginPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  return <LoginUser />;
}

export default LoginPage;
