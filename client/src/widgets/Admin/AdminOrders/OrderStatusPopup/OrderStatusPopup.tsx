import { ChangeEvent, FC, useEffect, useState } from 'react';

import { OrderStatus, orderStatusesData } from '@config/orderStatus';
import UpdateOrderStatus from '@processes/UpdateOrderStatus';

import Popup from '@shared/ui/Popup/Popup';

import styles from './OrderStatusPopup.module.css';

type TOrderStatusPopup = {
  orderId: string;
  orderStatus: OrderStatus;
  onClose: () => void;
};

const OrderStatusPopup: FC<TOrderStatusPopup> = (props) => {
  const { orderId, orderStatus, onClose } = props;

  const [status, setStatus] = useState<OrderStatus>(orderStatus);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as OrderStatus);
  };

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

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  return (
    <Popup onClose={onClose}>
      <div className={styles.container}>
        <ul className={styles.list}>{statusOptions}</ul>

        <UpdateOrderStatus
          orderId={orderId}
          status={status}
          setIsSuccess={setIsSuccess}
          buttonStyle={styles.button}
        />
      </div>
    </Popup>
  );
};

export default OrderStatusPopup;
