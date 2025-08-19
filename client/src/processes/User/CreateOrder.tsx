import { Dispatch, FC, SetStateAction } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import baseApi from '@config/baseApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { ICreateOrderData } from '@shared/models/order';
import { useCreateOrderMutation } from '@shared/api/orderApi';
import { useAppDispatch } from '@shared/hooks/reduxHooks';

type TCreateOrder = {
  handleSubmit: UseFormHandleSubmit<ICreateOrderData>;
  setError: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  buttonStyle: string;
};

const CreateOrder: FC<TCreateOrder> = (props) => {
  const { handleSubmit, setError, isSubmitting, buttonStyle } = props;

  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onOrderCreation = async (data: ICreateOrderData) => {
    try {
      const response = await createOrder({ ...data }).unwrap();
      if (response) {
        dispatch(baseApi.util.invalidateTags(['Cart', 'Users']));
        navigate('/');
        toast.success('Order successfully created');
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

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      onClick={handleSubmit(onOrderCreation)}
      className={buttonStyle}
    >
      Proceed to payment
    </button>
  );
};

export default CreateOrder;
