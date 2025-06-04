import { FC, useEffect, useState } from 'react';

import { IOrder } from '@shared/models/order';
import ModalViewOrder from '@modals/ModalViewOrder/ModalViewOrder';

import styles from './AdminOrder.module.css';

const AdminOrder: FC<IOrder> = ({
  id,
  customer,
  contactInfo,
  address,
  netAmount,
  status,
}) => {
  const [modalOrderVisible, setModalOrderVisible] = useState<boolean>(false);
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

  const showOrder = () => setModalOrderVisible(true);
  const hideOrder = () => setModalOrderVisible(false);

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
        <li>
          Net amount: <span>{netAmount}</span>
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
        <button
          type="button"
          onClick={showOrder}
          className={styles.buttonOrder}
        >
          View order
        </button>
      </div>

      {modalOrderVisible && <ModalViewOrder onClose={hideOrder} orderId={id} />}
    </li>
  );
};

export default AdminOrder;
