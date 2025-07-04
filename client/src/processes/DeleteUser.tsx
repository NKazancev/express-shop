import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteUserMutation } from '@shared/api/userApi';
import { useLogoutMutation } from '@shared/api/authApi';

import DeleteProfileButton from '@widgets/User/UserInfo/DeleteProfileButton/DeleteProfileButton';

const DeleteUser = () => {
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = async () => {
      await logout();
      await navigate('/');
      toast.success('Profile was successfully deleted');
    };
    if (isSuccess) {
      handler();
    }
  }, [isSuccess, logout, navigate, toast]);

  const handleDelete = async () => {
    try {
      await deleteUser().unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return <DeleteProfileButton onProfileDelete={handleDelete} />;
};

export default DeleteUser;
