import { FC, useEffect, useState } from 'react';

import { IOrder } from '@shared/models/order';

import styles from './AdminOrder.module.css';

const AdminOrder: FC<IOrder> = ({
  id,
  customer,
  contactInfo,
  address,
  status,
}) => {
  const [orderStatusColor, setOrderStatusColor] = useState<string>();

  useEffect(() => {
    switch (status) {
      case 'PENDING':
        setOrderStatusColor('#F9EA7A');
        break;
      default:
        setOrderStatusColor('#F9EA7A');
    }
  }, [status]);

  return (
    <li className={styles.order}>
      <ul className={styles.info}>
        <li>
          OrderID: <span>{id}</span>
        </li>
        <li>
          Customer: <span>{customer}</span>
        </li>
        <li>
          Contact info: <span>{contactInfo}</span>
        </li>
        <li>
          Address: <span>{address}</span>
        </li>
      </ul>

      <div className={styles.status}>
        <div
          style={{ backgroundColor: orderStatusColor }}
          className={styles.circle}
        />
        <span>{status}</span>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.buttonStatus}>
          Change status
        </button>
        <button type="button" className={styles.buttonOrder}>
          View order
        </button>
      </div>
    </li>
  );
};

export default AdminOrder;
