import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

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
      if (accessToken && role) {
        dispatch(setCredentials({ accessToken, role }));
        toast.success('Successful login');
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return <LoginForm onLogin={handleLogin} apiError={error} />;
}

export default LoginUser;
