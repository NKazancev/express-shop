import { FC } from 'react';

import { IOrder } from '@shared/models/order';
import AdminOrder from '../AdminOrder/AdminOrder';

import styles from './AdminOrdersList.module.css';

type TAdminOrdersList = {
  orders: IOrder[];
};

const AdminOrdersList: FC<TAdminOrdersList> = ({ orders }) => {
  const ordersList = orders.map((order) => {
    return (
      <AdminOrder
        key={order.id}
        id={order.id}
        status={order.status}
        customer={order.customer}
        contactInfo={order.contactInfo}
        address={order.address}
        netAmount={order.netAmount}
      />
    );
  });

  return <ul className={styles.orders}>{ordersList}</ul>;
};

export default AdminOrdersList;
