import { FC, useState } from 'react';

import { IProduct } from '@shared/models/product';
import { STATIC_URL } from '@config/consts';

import { useDeleteProductMutation } from '@shared/api/productApi';

import StockCounter from '../StockCounter/StockCounter';
import ModalUpdateProductInfo from '@modals/ModalUpdateProductInfo/ModalUpdateProductInfo';
import ModalUpdateProductGallery from '@modals/ModalUpdateProductGallery/ModalUpdateProductGallery';

import penIcon from '@shared/assets/pen-icon.svg';
import imageIcon from '@shared/assets/image-icon.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './AdminProduct.module.css';

const AdminProduct: FC<IProduct> = ({ id, image, name, price, stock }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const [modalInfoVisible, setModalInfoVisible] = useState<boolean>(false);
  const [galleryModalVisible, setGalleryModalVisible] =
    useState<boolean>(false);

  const showInfoModal = () => setModalInfoVisible(true);
  const hideInfoModal = () => setModalInfoVisible(false);
  const showGalleryModal = () => setGalleryModalVisible(true);
  const hideGalleryModal = () => setGalleryModalVisible(false);

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <li className={styles.item}>
        <div className={styles.image}>
          <img src={`${STATIC_URL}/${image}`} alt="image" />
        </div>

        <h5 className={styles.name}>{name}</h5>

        <StockCounter id={id} stock={stock} />

        <div className={styles.price}>{price}</div>

        <div className={styles.buttons}>
          <button type="button" onClick={showInfoModal}>
            <img src={penIcon} alt="pen-icon" width={12} />
          </button>
          <button type="button" onClick={showGalleryModal}>
            <img src={imageIcon} alt="pen-icon" width={12} />
          </button>
          <button type="button" onClick={handleDeleteProduct}>
            <img src={xbutton} alt="delete-icon" width={12} />
          </button>
        </div>
      </li>

      {modalInfoVisible && (
        <ModalUpdateProductInfo productId={id} onClose={hideInfoModal} />
      )}
      {galleryModalVisible && (
        <ModalUpdateProductGallery productId={id} onClose={hideGalleryModal} />
      )}
    </>
  );
};

export default AdminProduct;
