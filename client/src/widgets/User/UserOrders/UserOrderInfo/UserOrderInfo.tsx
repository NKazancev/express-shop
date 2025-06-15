import { FC } from 'react';

import { IOrder } from '@shared/models/order';

import styles from './UserOrderInfo.module.css';

type TUserOrderInfo = {
  order: IOrder;
};

const UserOrderInfo: FC<TUserOrderInfo> = ({ order }) => {
  const { contactInfo, address, netAmount } = order;

  return (
    <ul className={styles.info}>
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

export default UserOrderInfo;
