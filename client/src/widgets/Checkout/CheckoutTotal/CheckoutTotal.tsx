import { Dispatch, FC, SetStateAction } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import CreateOrder from '@processes/CreateOrder';

import { ICartProduct } from '@shared/models/cart';
import { ICreateOrderData } from '@shared/models/order';
import { useCartItemsCount, useCartTotalPrice } from '@shared/hooks/useCart';

import styles from './CheckoutTotal.module.css';

type TCheckoutTotal = {
  items?: ICartProduct[];
  handleSubmit: UseFormHandleSubmit<ICreateOrderData>;
  setError: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
};

const CheckoutTotal: FC<TCheckoutTotal> = (props) => {
  const { items, handleSubmit, setError, isSubmitting } = props;

  const itemsQuantity = useCartItemsCount(items);
  const totalPrice = useCartTotalPrice(items);

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

      <CreateOrder
        handleSubmit={handleSubmit}
        setError={setError}
        isSubmitting={isSubmitting}
        buttonStyle={styles.button}
      />
    </div>
  );
};

export default CheckoutTotal;
