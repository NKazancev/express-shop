import { FC } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { ICartProduct } from '@shared/models/cart';
import { ICreateOrderData } from '@shared/models/order';
import useCartTotal from '@shared/hooks/useCartTotal';
import { useCreateOrderMutation } from '@shared/api/orderApi';

import styles from './CheckoutTotal.module.css';

type TCheckoutTotal = {
  items?: ICartProduct[];
  handleSubmit: UseFormHandleSubmit<ICreateOrderData>;
};

const CheckoutTotal: FC<TCheckoutTotal> = ({ items, handleSubmit }) => {
  const { itemsQuantity, totalPrice } = useCartTotal(items);
  const [createOrder] = useCreateOrderMutation();

  const onOrderCreation = async (data: ICreateOrderData) => {
    try {
      await createOrder({ ...data }).unwrap();
    } catch (error) {
      console.log(error);
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
        onClick={handleSubmit(onOrderCreation)}
        className={styles.button}
      >
        Proceed to payment
      </button>
    </div>
  );
};

export default CheckoutTotal;
