import { useCreateUserMutation } from '@shared/api/userApi';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { ICreateUserData } from '@shared/models/user';
import { setCredentials } from '@shared/slices/userSlice';
import RegistrationForm from '@widgets/Auth/RegistrationForm/RegistrationForm';

function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

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

export default CreateUser;
