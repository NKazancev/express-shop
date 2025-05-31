import { FC, useEffect } from 'react';

import {
  useGetProductByIdQuery,
  useUpdateProductInfoMutation,
} from '@shared/api/productApi';

import UpdateProductInfoForm from '@widgets/Admin/UpdateProductInfoForm/UpdateProductInfoForm';
import { UpdateProductInfoData } from '@shared/models/product';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUpdateProductInfo.module.css';

type TModalReview = {
  onClose: () => void;
  productId: string;
};

const ModalUpdateProductInfo: FC<TModalReview> = ({ onClose, productId }) => {
  const { data: productData, fulfilledTimeStamp } =
    useGetProductByIdQuery(productId);

  const [updateProduct, { isSuccess }] = useUpdateProductInfoMutation();

  const updateProductInfo = async (data: UpdateProductInfoData) => {
    try {
      const price = Number(data.price);
      await updateProduct({ id: productId, ...data, price }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Update product info</h3>

        <UpdateProductInfoForm
          key={`update-product-${fulfilledTimeStamp}`}
          onProductUpdate={updateProductInfo}
          productData={productData}
        />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalUpdateProductInfo;
