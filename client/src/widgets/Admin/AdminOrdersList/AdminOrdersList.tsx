import { FC } from 'react';

import { IOrder } from '@shared/models/order';
import AdminOrder from '../AdminOrder/AdminOrder';

import styles from './AdminOrdersList.module.css';

type TOrdersList = {
  orders?: IOrder[];
};

const AdminOrdersList: FC<TOrdersList> = ({ orders }) => {
  const ordersList = orders?.map((order) => {
    return <AdminOrder key={order.id} {...order} />;
  });

  return (
    <>
      {orders && orders?.length > 0 ? (
        <ul className={styles.orders}>{ordersList}</ul>
      ) : (
        <p className={styles.notification}>Nobody has placed any order yet</p>
      )}
    </>
  );
};

export default AdminOrdersList;
