import { FC, memo, useState } from 'react';

import { STATIC_URL } from '@config/consts';
import DeleteProduct from '@processes/Admin/DeleteProduct';

import { IProduct } from '@shared/models/product';
import StockCounter from '../StockCounter/StockCounter';

import ModalUpdateProductInfo from '@modals/ModalUpdateProductInfo/ModalUpdateProductInfo';
import ModalUpdateProductGallery from '@modals/ModalUpdateProductGallery/ModalUpdateProductGallery';

import penIcon from '@shared/assets/pen-icon.svg';
import imageIcon from '@shared/assets/image-icon.svg';
import styles from './AdminProduct.module.css';

const AdminProduct: FC<Omit<IProduct, 'description'>> = memo((props) => {
  const { id, image, name, price, stock } = props;

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);
  const [modalGalleryVisible, setGalleryModalVisible] =
    useState<boolean>(false);

  const showInfoModal = () => setModalInfoVisible(true);
  const hideInfoModal = () => setModalInfoVisible(false);
  const showGalleryModal = () => setGalleryModalVisible(true);
  const hideGalleryModal = () => setGalleryModalVisible(false);

  return (
    <>
      <li className={styles.item}>
        <div className={styles.image}>
          <img src={`${STATIC_URL}/${image}`} alt="image" />
        </div>

        <h5 className={styles.name}>{name}</h5>

        {stock && <StockCounter id={id} stock={stock} />}

        <div className={styles.price}>{price}</div>

        <div className={styles.actions}>
          <button type="button" onClick={showInfoModal}>
            <img src={penIcon} alt="pen-icon" width={12} />
          </button>
          <button type="button" onClick={showGalleryModal}>
            <img src={imageIcon} alt="pen-icon" width={12} />
          </button>

          <DeleteProduct productId={id} />
        </div>
      </li>

      {modalInfoVisible && (
        <ModalUpdateProductInfo productId={id} onClose={hideInfoModal} />
      )}
      {modalGalleryVisible && (
        <ModalUpdateProductGallery productId={id} onClose={hideGalleryModal} />
      )}
    </>
  );
});

export default AdminProduct;
