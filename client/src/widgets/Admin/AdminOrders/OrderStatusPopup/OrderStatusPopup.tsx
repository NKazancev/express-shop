import { ChangeEvent, FC, useEffect, useState } from 'react';

import { OrderStatus, orderStatusesData } from '@config/orderStatus';
import { useUpdateOrderStatusMutation } from '@shared/api/orderApi';
import Popup from '@shared/ui/Popup/Popup';

import styles from './OrderStatusPopup.module.css';

type TOrderStatusPopup = {
  orderId: string;
  orderStatus: OrderStatus;
  onClose: () => void;
};

const OrderStatusPopup: FC<TOrderStatusPopup> = ({
  orderId,
  orderStatus,
  onClose,
}) => {
  const [status, setStatus] = useState<OrderStatus>(orderStatus);
  const [updateOrderStatus, { isSuccess }] = useUpdateOrderStatusMutation();

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as OrderStatus);
  };

  const handleOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: orderId, status }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const statusOptions = orderStatusesData.map(({ id, value, name }) => {
    const statusId = `{status-${value}${orderId}}`;
    const optionClass = value === status ? styles.activeOption : '';

    return (
      <li key={id} className={optionClass}>
        <input
          type="radio"
          name="status"
          id={statusId}
          value={value}
          onChange={changeStatus}
          checked={value === status}
          className="visually-hidden"
        />
        <label htmlFor={statusId} className={styles.label}>
          {name}
        </label>
      </li>
    );
  });

  return (
    <Popup onClose={onClose}>
      <div className={styles.container}>
        <ul className={styles.list}>{statusOptions}</ul>

        <button
          type="button"
          onClick={handleOrderStatus}
          className={styles.button}
        >
          Confirm
        </button>
      </div>
    </Popup>
  );
};

export default OrderStatusPopup;
