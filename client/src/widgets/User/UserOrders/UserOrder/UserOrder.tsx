import { FC } from 'react';

import { IOrderData } from '@shared/models/order';
import { orderStatusesData } from '@config/orderStatus';
import useOrderStatusColor from '@shared/hooks/useOrderStatusColor';

import UserOrderInfo from '../UserOrderInfo/UserOrderInfo';
import UserOrderProducts from '../UserOrderProducts/UserOrderProducts';

import styles from './UserOrder.module.css';

const UserOrder: FC<IOrderData> = (order) => {
  const { status, products } = order;
  const orderStatusColor = useOrderStatusColor(status);
  const statusName = orderStatusesData.find((s) => s.value === status)?.name;

  return (
    <li className={styles.order}>
      <div className={styles.info}>
        <UserOrderInfo order={order} />

        <div className={styles.status}>
          <div
            style={{ backgroundColor: orderStatusColor }}
            className={styles.circle}
          />
          <span>{statusName}</span>
        </div>
      </div>

      <UserOrderProducts products={products} />
    </li>
  );
};

export default UserOrder;
