import { FC } from 'react';

import { IOrderData } from '@shared/models/order';
import UserOrder from '../UserOrder/UserOrder';

import styles from './UserOrdersList.module.css';

type TUserOrdersList = {
  orders: IOrderData[];
};

const UserOrdersList: FC<TUserOrdersList> = ({ orders }) => {
  const ordersList = orders.map((order) => {
    return (
      <UserOrder
        key={order.id}
        status={order.status}
        contactInfo={order.contactInfo}
        address={order.address}
        netAmount={order.netAmount}
        products={order.products}
      />
    );
  });

  return (
    <>
      {orders?.length ? (
        <ul className={styles.orders}>{ordersList}</ul>
      ) : (
        <p className={styles.notification}>You don't have any orders</p>
      )}
    </>
  );
};

export default UserOrdersList;
