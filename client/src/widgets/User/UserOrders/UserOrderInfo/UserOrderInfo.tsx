import { FC } from 'react';

import { IOrder } from '@shared/models/order';

import styles from './UserOrderInfo.module.css';

type TUserOrderInfo = Pick<IOrder, 'contactInfo' | 'address' | 'netAmount'>;

const UserOrderInfo: FC<TUserOrderInfo> = (props) => {
  const { contactInfo, address, netAmount } = props;

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
