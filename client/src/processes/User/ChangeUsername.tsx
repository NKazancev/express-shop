import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useChangeUsernameMutation } from '@shared/api/userApi';
import { IUser } from '@shared/models/user';

import ChangeUsernameForm from '@widgets/User/UserInfo/ChangeUsernameForm/ChangeUsernameForm';

type TChangeUsername = {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const ChangeUsername: FC<TChangeUsername> = ({ setIsSuccess }) => {
  const [changeUsername, { isSuccess }] = useChangeUsernameMutation();
  const [error, setError] = useState<string>();

  const handleUsernameChange = async (data: Pick<IUser, 'username'>) => {
    try {
      await changeUsername({ ...data }).unwrap();
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
    <ChangeUsernameForm
      onUsernameChange={handleUsernameChange}
      apiError={error}
    />
  );
};

export default ChangeUsername;
