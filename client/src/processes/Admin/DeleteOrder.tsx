import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteOrderMutation } from '@shared/api/orderApi';
import Confirmation from '@shared/ui/Confirmation/Confirmation';

type TDeleteProduct = {
  orderId: string;
  buttonStyle: string;
};

const DeleteOrder: FC<TDeleteProduct> = ({ orderId, buttonStyle }) => {
  const [deleteOrder] = useDeleteOrderMutation();

  const [confirmationVisible, setConfirmationVisible] = useState<boolean>();
  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleDelete = async () => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success('Successfully deleted');
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
    <>
      <button type="button" onClick={showConfirmation} className={buttonStyle}>
        Delete order
      </button>

      {confirmationVisible && (
        <Confirmation
          text={'Are you sure you want to delete this order?'}
          onAgree={handleDelete}
          onClose={hideConfirmation}
        />
      )}
    </>
  );
};

export default DeleteOrder;
