import { FC, useEffect, useState } from 'react';

import { IOrder } from '@shared/models/order';
import { orderStatusesData } from '@config/orderStatus';

import ModalViewOrder from '@modals/ModalViewOrder/ModalViewOrder';
import OrderStatusPopup from './OrderStatusPopup/OrderStatusPopup';

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
  const [popupStatusVisible, setPopupStatusVisible] = useState<boolean>(false);
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
  const togglePopup = () => setPopupStatusVisible((prev) => !prev);
  const closePopup = () => setPopupStatusVisible(false);

  const statusName = orderStatusesData.find((s) => s.value === status)?.name;

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
        <span>{statusName}</span>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={togglePopup}
          className={styles.btnStatus}
        >
          Change status
        </button>

        <button type="button" onClick={showOrder} className={styles.btnOrder}>
          View order
        </button>

        {popupStatusVisible && (
          <OrderStatusPopup
            onClose={closePopup}
            orderId={id}
            orderStatus={status}
          />
        )}
      </div>

      {modalOrderVisible && <ModalViewOrder onClose={hideOrder} orderId={id} />}
    </li>
  );
};

export default AdminOrder;
