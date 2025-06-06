import { FC, useState } from 'react';

import { IOrder } from '@shared/models/order';
import { orderStatusesData } from '@config/orderStatus';
import useOrderStatusColor from '@shared/hooks/useOrderStatusColor';

import ModalViewOrder from '@modals/ModalViewOrder/ModalViewOrder';
import OrderStatusPopup from '../OrderStatusPopup/OrderStatusPopup';

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

  const showOrderInfo = () => setModalOrderVisible(true);
  const hideOrderInfo = () => setModalOrderVisible(false);
  const togglePopup = () => setPopupStatusVisible((prev) => !prev);
  const closePopup = () => setPopupStatusVisible(false);

  const orderStatusColor = useOrderStatusColor(status);
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

        <button
          type="button"
          onClick={showOrderInfo}
          className={styles.btnOrder}
        >
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

      {modalOrderVisible && (
        <ModalViewOrder onClose={hideOrderInfo} orderId={id} />
      )}
    </li>
  );
};

export default AdminOrder;
