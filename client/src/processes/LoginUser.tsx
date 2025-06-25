import { useState } from 'react';

import { useLoginMutation } from '@shared/api/authApi';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { ILoginData } from '@shared/models/auth';
import { setCredentials } from '@shared/slices/userSlice';

import LoginForm from '@widgets/Auth/LoginForm/LoginForm';

function LoginUser() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>();

  const handleLogin = async (data: ILoginData) => {
    try {
      const { accessToken, role } = await login({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return <LoginForm onLogin={handleLogin} loginError={error} />;
}

export default LoginUser;
