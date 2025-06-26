import { FC, useEffect, useState } from 'react';

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@shared/api/productApi';

import UpdateProductForm from '@widgets/Admin/AdminProducts/UpdateProductForm/UpdateProductForm';
import { TUpdateProductData } from '@shared/models/product';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUpdateProduct.module.css';

type TModalReview = {
  onClose: () => void;
  productId: string;
};

const ModalUpdateProduct: FC<TModalReview> = ({ onClose, productId }) => {
  const { data: productData, fulfilledTimeStamp } =
    useGetProductByIdQuery(productId);
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  const [error, setError] = useState<string>();

  const handleProductUpdate = async (data: TUpdateProductData) => {
    try {
      const price = Number(data.price);
      const stock = Number(data.stock);
      await updateProduct({ id: productId, ...data, price, stock }).unwrap();
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Update product info</h3>

        <UpdateProductForm
          key={`update-product-${fulfilledTimeStamp}`}
          onProductUpdate={handleProductUpdate}
          productData={productData}
          apiError={error}
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

export default ModalUpdateProduct;
