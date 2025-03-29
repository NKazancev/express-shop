import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useCreateUserMutation } from '../shared/api/userApi';
import { useAppDispatch, useAppSelector } from '../shared/hooks/reduxHooks';
import { ICreateUserData } from '../shared/models/user';
import { setCredentials } from '../shared/slices/userSlice';
import RegistrationForm from '../widgets/RegistrationForm/RegistrationForm';

function RegistrationPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  const handleRegistration = async (data: ICreateUserData) => {
    try {
      const { accessToken, role } = await createUser({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error) {
      console.log(error);
    }
  };

  return <RegistrationForm onRegister={handleRegistration} />;
}

export default RegistrationPage;
