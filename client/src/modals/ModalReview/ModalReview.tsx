import { FC, useEffect } from 'react';

import { useCreateProductReviewMutation } from '@shared/api/reviewApi';
import { useLazyGetProductByIdQuery } from '@shared/api/productApi';
import { ICreateReviewData } from '@shared/models/review';
import ReviewForm from '@widgets/Product/ProductReviews/ReviewForm/ReviewForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalReview.module.css';

type TModalReview = {
  onClose: () => void;
  productId?: string;
};

const ModalReview: FC<TModalReview> = ({ onClose, productId }) => {
  const [createProductReview, { isSuccess }] = useCreateProductReviewMutation();
  const [trigger] = useLazyGetProductByIdQuery();

  useEffect(() => {
    if (isSuccess && productId) {
      onClose();
      trigger(productId);
    }
  }, [isSuccess]);

  const handleReviewCreation = async (data: ICreateReviewData) => {
    try {
      await createProductReview({ ...data, productId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Review form</h3>

        <ReviewForm onReviewCreation={handleReviewCreation} />

        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalReview;
