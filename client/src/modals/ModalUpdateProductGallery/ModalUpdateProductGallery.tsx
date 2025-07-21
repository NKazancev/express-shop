import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useUpdateProductGalleryMutation } from '@shared/api/productApi';
import { TUpdateGalleryData } from '@shared/models/product';
import UpdateProductGalleryForm from '@widgets/Admin/AdminProducts/UpdateProductGalleryForm/UpdateProductGalleryForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalUpdateProductGallery.module.css';

type TModalReview = {
  onClose: () => void;
  productId: string;
};

const ModalUpdateProductGallery: FC<TModalReview> = (props) => {
  const { onClose, productId } = props;

  const [updateProductGallery, { isSuccess }] =
    useUpdateProductGalleryMutation();
  const [error, setError] = useState<string>();

  const handleGalleryUpdate = async (data: TUpdateGalleryData) => {
    try {
      const { image, images } = data;
      const formData = new FormData();
      formData.append('data', JSON.stringify({ productId }));
      formData.append('image', image[0]);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      await updateProductGallery(formData).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Update gallery</h3>

        <UpdateProductGalleryForm
          updateGallery={handleGalleryUpdate}
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

export default ModalUpdateProductGallery;
