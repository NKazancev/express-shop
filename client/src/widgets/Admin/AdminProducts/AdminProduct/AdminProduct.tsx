import { FC, useState } from 'react';

import { IProduct } from '@shared/models/product';
import { STATIC_URL } from '@config/consts';

import { useDeleteProductMutation } from '@shared/api/productApi';

import StockCounter from '../StockCounter/StockCounter';
import ModalUpdateProduct from '@modals/ModalUpdateProduct/ModalUpdateProduct';

import penIcon from '@shared/assets/pen-icon.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './AdminProduct.module.css';

const AdminProduct: FC<IProduct> = ({ id, image, name, price, stock }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

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
          <button type="button" onClick={showModal}>
            <img src={penIcon} alt="pen-icon" width={12} />
          </button>
          <button type="button" onClick={handleDeleteProduct}>
            <img src={xbutton} alt="delete-icon" width={12} />
          </button>
        </div>
      </li>

      {modalVisible && (
        <ModalUpdateProduct productId={id} onClose={hideModal} />
      )}
    </>
  );
};

export default AdminProduct;
