import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useChangePasswordMutation } from '@shared/api/userApi';
import { IPasswordData } from '@shared/models/user';

import ChangePasswordForm from '@widgets/User/UserInfo/ChangePasswordForm/ChangePasswordForm';

type TChangePassword = {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const ChangePassword: FC<TChangePassword> = ({ setIsSuccess }) => {
  const [changePassword, { isSuccess }] = useChangePasswordMutation();
  const [error, setError] = useState<string>();

  const handlePasswordChange = async (data: IPasswordData) => {
    try {
      await changePassword({ ...data }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) setIsSuccess(true);
  }, [isSuccess]);

  return (
    <>
      <ChangePasswordForm
        onPasswordChange={handlePasswordChange}
        apiError={error}
      />
    </>
  );
};

export default ChangePassword;
