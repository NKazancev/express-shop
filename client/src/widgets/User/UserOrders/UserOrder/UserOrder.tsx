import { FC } from 'react';

import { IOrderData } from '@shared/models/order';
import { orderStatusesData } from '@config/orderStatus';
import useOrderStatusColor from '@shared/hooks/useOrderStatusColor';

import UserOrderInfo from '../UserOrderInfo/UserOrderInfo';
import UserOrderProducts from '../UserOrderProducts/UserOrderProducts';

import styles from './UserOrder.module.css';

type TUserOrder = Pick<
  IOrderData,
  'status' | 'contactInfo' | 'address' | 'netAmount' | 'products'
>;

const UserOrder: FC<TUserOrder> = (order) => {
  const { status, contactInfo, address, netAmount, products } = order;

  const orderStatusColor = useOrderStatusColor(status);
  const statusName = orderStatusesData.find((s) => s.value === status)?.name;

  return (
    <li className={styles.order}>
      <div className={styles.info}>
        <UserOrderInfo
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
      </div>

      <UserOrderProducts products={products} />
    </li>
  );
};

export default UserOrder;
