import { ILoginUserData } from '../shared/models/user';
import LoginForm from '../widgets/LoginForm/LoginForm';

function LoginPage() {
  const handleLogin = async (data: ILoginUserData) => {
    console.log(data);
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
