import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteUserMutation } from '@shared/api/userApi';
import { useLogoutMutation } from '@shared/api/authApi';

import Confirmation from '@shared/ui/Confirmation/Confirmation';

const DeleteUser = ({ buttonStyle }: { buttonStyle: string }) => {
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const [confirmationVisible, setConfirmationVisible] = useState<boolean>();

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  useEffect(() => {
    const handler = async () => {
      hideConfirmation();
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
      hideConfirmation();
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <button type="button" onClick={showConfirmation} className={buttonStyle}>
        <span>Delete profile</span>
      </button>

      {confirmationVisible && (
        <Confirmation
          text={'Are you sure you want to delete your profile?'}
          onAgree={handleDelete}
          onClose={hideConfirmation}
        />
      )}
    </div>
  );
};

export default DeleteUser;
