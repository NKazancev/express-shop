import { useLoginMutation } from '../shared/api/authApi';
import { useAppDispatch } from '../shared/hooks/reduxHooks';
import { ILoginData } from '../shared/models/auth';
import { setCredentials } from '../shared/slices/userSlice';
import LoginForm from '../widgets/LoginForm/LoginForm';

function LoginUser() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: ILoginData) => {
    try {
      const { accessToken, role } = await login({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error) {
      console.log(error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginUser;
