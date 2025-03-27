import { useRegisterMutation } from '../shared/api/userApi';
import { useAppDispatch } from '../shared/hooks/reduxHooks';
import { IRegistrationUserData } from '../shared/models/user';
import { setCredentials } from '../shared/slices/userSlice';
import RegistrationForm from '../widgets/RegistrationForm/RegistrationForm';

function RegistrationPage() {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();

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
