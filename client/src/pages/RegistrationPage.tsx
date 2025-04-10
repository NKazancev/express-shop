import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '../shared/hooks/reduxHooks';
import CreateUser from '../processes/CreateUser';

function RegistrationPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  return <CreateUser />;
}

export default RegistrationPage;
