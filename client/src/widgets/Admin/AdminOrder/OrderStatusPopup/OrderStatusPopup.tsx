import { FC, useEffect, useState } from 'react';

import { useUpdateOrderStatusMutation } from '@shared/api/orderApi';
import { orderStatusesData } from '@config/orderStatus';

import styles from './OrderStatusPopup.module.css';

type TOrderStatusPopup = {
  orderId: string;
  orderStatus: string;
  onClose: () => void;
};

const OrderStatusPopup: FC<TOrderStatusPopup> = ({
  orderId,
  orderStatus,
  onClose,
}) => {
  const [status, setStatus] = useState<string>(orderStatus);
  const [updateOrderStatus, { isSuccess }] = useUpdateOrderStatusMutation();

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
    const statusId = `{status-${value}}`;
    const optionClass = value === status ? styles.activeOption : '';

    return (
      <li key={id} className={optionClass}>
        <input
          type="radio"
          name="status"
          id={statusId}
          value={value}
          onChange={(e) => setStatus(e.target.value)}
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
  );
};

export default OrderStatusPopup;
