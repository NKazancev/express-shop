import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useRegisterMutation } from '../shared/api/userApi';
import { useAppDispatch, useAppSelector } from '../shared/hooks/reduxHooks';
import { IRegistrationUserData } from '../shared/models/user';
import { setCredentials } from '../shared/slices/userSlice';
import RegistrationForm from '../widgets/RegistrationForm/RegistrationForm';

function RegistrationPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  const handleRegistration = async (data: IRegistrationUserData) => {
    try {
      const { accessToken, role } = await register({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error) {
      console.log(error);
    }
  };

  return <RegistrationForm onRegister={handleRegistration} />;
}

export default RegistrationPage;
