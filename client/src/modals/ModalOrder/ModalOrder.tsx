import { FC } from 'react';

import { useGetOrderByIdQuery } from '@shared/api/orderApi';

import Modal from '@shared/ui/Modal/Modal';
import AdminOrderInfo from '@widgets/Admin/AdminOrders/AdminOrderInfo/AdminOrderInfo';

import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalOrder.module.css';
import AdminOrderProducts from '@widgets/Admin/AdminOrders/AdminOrderProducts/AdminOrderProducts';

type TModalViewOrder = {
  onClose: () => void;
  orderId: string;
};

const ModalOrderInfo: FC<TModalViewOrder> = ({ onClose, orderId }) => {
  const { data: order } = useGetOrderByIdQuery(orderId);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Order info</h3>

        <div className={styles.info}>
          {order && <AdminOrderInfo order={order} />}
          {order && <AdminOrderProducts products={order.products} />}
        </div>

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
