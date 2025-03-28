import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '../shared/api/userApi';
import { useAppDispatch, useAppSelector } from '../shared/hooks/reduxHooks';
import { ILoginUserData } from '../shared/models/user';
import { setCredentials } from '../shared/slices/userSlice';
import LoginForm from '../widgets/LoginForm/LoginForm';

function LoginPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  const handleLogin = async (data: ILoginUserData) => {
    try {
      const { accessToken, role } = await login({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error) {
      console.log(error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
