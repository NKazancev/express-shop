import { FC, useState } from 'react';

import { IOrder } from '@shared/models/order';
import { orderStatusesData } from '@config/orderStatus';
import useOrderStatusColor from '@shared/hooks/useOrderStatusColor';

import ModalOrderInfo from '@modals/ModalOrder/ModalOrder';
import AdminOrderInfo from '../AdminOrderInfo/AdminOrderInfo';
import OrderStatusPopup from '../OrderStatusPopup/OrderStatusPopup';

import styles from './AdminOrder.module.css';

const AdminOrder: FC<IOrder> = (order) => {
  const { id, status } = order;

  const orderStatusColor = useOrderStatusColor(status);
  const statusName = orderStatusesData.find((s) => s.value === status)?.name;

  const [modalOrderVisible, setModalOrderVisible] = useState<boolean>(false);
  const [popupStatusVisible, setPopupStatusVisible] = useState<boolean>(false);

  const showOrderInfo = () => setModalOrderVisible(true);
  const hideOrderInfo = () => setModalOrderVisible(false);
  const togglePopup = () => setPopupStatusVisible((prev) => !prev);
  const closePopup = () => setPopupStatusVisible(false);

  return (
    <li className={styles.order}>
      <AdminOrderInfo order={order} />

      <div className={styles.status}>
        <div
          style={{ backgroundColor: orderStatusColor }}
          className={styles.circle}
        />
        <span>{statusName}</span>
      </div>

      <div className={styles.buttons}>
        <div>
          <button type="button" onClick={togglePopup} className={styles.button}>
            Change status
          </button>
          {popupStatusVisible && (
            <OrderStatusPopup
              onClose={closePopup}
              orderId={id}
              orderStatus={status}
            />
          )}
        </div>

        <button type="button" onClick={showOrderInfo} className={styles.button}>
          View order
        </button>
      </div>

      {modalOrderVisible && (
        <ModalOrderInfo onClose={hideOrderInfo} orderId={id} />
      )}
    </li>
  );
};

export default AdminOrder;
