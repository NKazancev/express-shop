import { FC, useState } from 'react';

import { IProduct } from '@shared/models/product';
import { STATIC_URL } from '@config/consts';

import StockCounter from './StockCounter/StockCounter';
import ModalUpdateProductInfo from '@modals/ModalUpdateProductInfo/ModalUpdateProductInfo';

import penIcon from '@shared/assets/pen-icon.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './AdminProduct.module.css';

const AdminProduct: FC<IProduct> = ({ id, image, name, price }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <li className={styles.item}>
        <div className={styles.image}>
          <img src={`${STATIC_URL}/${image}`} alt="image" />
        </div>

        <h5 className={styles.name}>{name}</h5>

        <StockCounter id={id} />

        <div className={styles.price}>{price}</div>

        <div className={styles.buttons}>
          <button type="button" onClick={showModal}>
            <img src={penIcon} alt="pen-icon" width={13} />
          </button>
          <button>
            <img src={xbutton} alt="delete-icon" width={13} />
          </button>
        </div>
      </li>

      {modalVisible && (
        <ModalUpdateProductInfo productId={id} onClose={hideModal} />
      )}
    </>
  );
};

export default AdminProduct;
