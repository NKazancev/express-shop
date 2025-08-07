import { FC, useState } from 'react';

import DeleteOrder from '@processes/Admin/DeleteOrder';

import OrderStatusPopup from './OrderStatusPopup/OrderStatusPopup';
import ModalOrderInfo from '@modals/ModalOrderInfo/ModalOrderInfo';

import styles from './AdminOrderPanel.module.css';
import { IOrder } from '@shared/models/order';

type TAdminOrderPanel = Pick<IOrder, 'id' | 'status'>;

const AdminOrderPanel: FC<TAdminOrderPanel> = (props) => {
  const { id, status } = props;

  const [modalOrderVisible, setModalOrderVisible] = useState<boolean>(false);
  const [popupStatusVisible, setPopupStatusVisible] = useState<boolean>(false);

  const showOrderInfo = () => setModalOrderVisible(true);
  const hideOrderInfo = () => setModalOrderVisible(false);
  const togglePopup = () => setPopupStatusVisible((prev) => !prev);
  const closePopup = () => setPopupStatusVisible(false);

  return (
    <div className={styles.panel}>
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

      <DeleteOrder orderId={id} buttonStyle={styles.deleteButton} />

      {modalOrderVisible && (
        <ModalOrderInfo onClose={hideOrderInfo} orderId={id} />
      )}
    </div>
  );
};

export default AdminOrderPanel;
