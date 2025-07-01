import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

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
      if (accessToken && role) {
        dispatch(setCredentials({ accessToken, role }));
        toast.success('Successful registration');
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

  return <RegistrationForm onRegister={handleRegistration} apiError={error} />;
}

export default CreateUser;
