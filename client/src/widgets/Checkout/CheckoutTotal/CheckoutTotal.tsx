import { FC } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { ICartProduct } from '@shared/models/cart';
import { ICreateOrderData } from '@shared/models/order';
import { useCartItemsCount, useCartTotalPrice } from '@shared/hooks/useCart';
import { useCreateOrderMutation } from '@shared/api/orderApi';

import styles from './CheckoutTotal.module.css';

type TCheckoutTotal = {
  items?: ICartProduct[];
  handleSubmit: UseFormHandleSubmit<ICreateOrderData>;
  setError: (data: string) => void;
  isSubmitting: boolean;
};

const CheckoutTotal: FC<TCheckoutTotal> = ({
  items,
  handleSubmit,
  setError,
  isSubmitting,
}) => {
  const itemsQuantity = useCartItemsCount(items);
  const totalPrice = useCartTotalPrice(items);
  const [createOrder] = useCreateOrderMutation();

  const onOrderCreation = async (data: ICreateOrderData) => {
    try {
      await createOrder({ ...data }).unwrap();
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
    <div className={styles.container}>
      <h5 className={styles.title}>Cart totals</h5>

      <div className={styles.quantity}>
        <span>Items quantity</span>
        <span>{itemsQuantity}</span>
      </div>

      <div className={styles.total}>
        <span>Total</span>
        <span>&#8381; {totalPrice}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={handleSubmit(onOrderCreation)}
        className={styles.button}
      >
        Proceed to payment
      </button>
    </div>
  );
};

export default CheckoutTotal;
