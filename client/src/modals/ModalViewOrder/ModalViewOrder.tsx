import { FC } from 'react';

import { useGetProductsByOrderIdQuery } from '@shared/api/orderApi';

import Modal from '@shared/ui/Modal/Modal';
import AdminViewOrder from '@widgets/Admin/AdminViewOrder/AdminViewOrder';

import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalViewOrder.module.css';

type TModalViewOrder = {
  onClose: () => void;
  orderId: string;
};

const ModalViewOrder: FC<TModalViewOrder> = ({ onClose, orderId }) => {
  const { data: orderProducts } = useGetProductsByOrderIdQuery(orderId);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Order</h3>

        {orderProducts && <AdminViewOrder products={orderProducts} />}

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalViewOrder;
