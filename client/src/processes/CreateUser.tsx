import { useState } from 'react';

import { useCreateUserMutation } from '@shared/api/userApi';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { TCreateUserData } from '@shared/models/user';
import { setCredentials } from '@shared/slices/userSlice';

import RegistrationForm from '@widgets/Auth/RegistrationForm/RegistrationForm';

function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>();

  const handleRegistration = async (data: TCreateUserData) => {
    try {
      const { accessToken, role } = await createUser({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken, role }));
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return <RegistrationForm onRegister={handleRegistration} apiError={error} />;
}

export default CreateUser;
