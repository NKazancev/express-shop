import { FC } from 'react';

import { IOrder } from '@shared/models/order';

import styles from './AdminOrderInfo.module.css';

const AdminOrderInfo: FC<IOrder> = (order) => {
  const { customer, contactInfo, address, netAmount } = order;

  return (
    <ul className={styles.info}>
      <li>
        Customer: <span>{customer}</span>
      </li>
      <li>
        Contact info: <span>{contactInfo}</span>
      </li>
      <li>
        Address: <span>{address}</span>
      </li>
      <li>
        Net amount: <span>{netAmount}</span>
      </li>
    </ul>
  );
};

export default AdminOrderInfo;
