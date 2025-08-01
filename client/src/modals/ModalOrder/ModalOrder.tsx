import { FC } from 'react';

import { PORTAL_CONTAINER_ID } from '@config/consts';

import { useGetOrderByIdQuery } from '@shared/api/orderApi';
import usePortal from '@shared/hooks/usePortal';
import Modal from '@shared/ui/Modal/Modal';

import AdminOrderInfo from '@widgets/Admin/AdminOrders/AdminOrderInfo/AdminOrderInfo';
import AdminOrderProducts from '@widgets/Admin/AdminOrders/AdminOrderProducts/AdminOrderProducts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalOrder.module.css';

type TModalOrder = {
  onClose: () => void;
  orderId: string;
};

const ModalOrderInfo: FC<TModalOrder> = ({ onClose, orderId }) => {
  const { data: order } = useGetOrderByIdQuery(orderId);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Order info</h3>

        {order && (
          <div className={styles.info}>
            <AdminOrderInfo
              customer={order.customer}
              contactInfo={order.contactInfo}
              address={order.address}
              netAmount={order.netAmount}
            />
            <AdminOrderProducts products={order.products} />
          </div>
        )}

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalOrderInfo;
