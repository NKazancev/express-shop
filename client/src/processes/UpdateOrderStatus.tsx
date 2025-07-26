import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';

import { OrderStatus } from '@config/orderStatus';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useUpdateOrderStatusMutation } from '@shared/api/orderApi';

type TUpdateOrderStatus = {
  orderId: string;
  status: OrderStatus;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  buttonStyle: string;
};

const UpdateOrderStatus: FC<TUpdateOrderStatus> = (props) => {
  const { orderId, status, setIsSuccess, buttonStyle } = props;

  const [updateOrderStatus, { isSuccess }] = useUpdateOrderStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateOrderStatus({ id: orderId, status }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) setIsSuccess(true);
  }, [isSuccess]);

  return (
    <button type="button" onClick={handleUpdate} className={buttonStyle}>
      Confirm
    </button>
  );
};

export default UpdateOrderStatus;
