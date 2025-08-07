import { FC, memo } from 'react';

import { orderStatusesData } from '@config/orderStatus';

import { IOrder } from '@shared/models/order';
import useOrderStatusColor from '@shared/hooks/useOrderStatusColor';

import AdminOrderInfo from '../AdminOrderInfo/AdminOrderInfo';
import AdminOrderPanel from '../AdminOrderPanel/AdminOrderPanel';

import styles from './AdminOrder.module.css';

const AdminOrder: FC<IOrder> = memo((order) => {
  const { id, status, customer, contactInfo, address, netAmount } = order;

  const orderStatusColor = useOrderStatusColor(status);
  const statusName = orderStatusesData.find((s) => s.value === status)?.name;

  return (
    <li className={styles.order}>
      <AdminOrderInfo
        customer={customer}
        contactInfo={contactInfo}
        address={address}
        netAmount={netAmount}
      />

      <div className={styles.status}>
        <div
          style={{ backgroundColor: orderStatusColor }}
          className={styles.circle}
        />
        <span>{statusName}</span>
      </div>

      <AdminOrderPanel id={id} status={status} />
    </li>
  );
});

export default AdminOrder;
