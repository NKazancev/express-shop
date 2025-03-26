import { IRegistrationUserData } from '../shared/models/user';
import RegistrationForm from '../widgets/RegistrationForm/RegistrationForm';

function RegistrationPage() {
  const handleRegistration = async (data: IRegistrationUserData) => {
    console.log(data);
  };

  return <RegistrationForm onRegister={handleRegistration} />;
}

export default RegistrationPage;
