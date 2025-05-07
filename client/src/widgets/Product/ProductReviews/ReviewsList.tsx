import { FC, useState } from 'react';
import { IProductReview } from '@shared/models/product';

import ModalReview from '@modals/ModalReview/ModalReview';

import styles from './ReviewsList.module.css';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetProductReviewQuery } from '@shared/api/reviewApi';

type TReviewsList = {
  reviews?: IProductReview[];
  productId?: string;
};

const ReviewsList: FC<TReviewsList> = ({ reviews, productId }) => {
  const { isLogged } = useAppSelector((state) => state.user);
  const { data: userReview } = useGetProductReviewQuery(productId);
  const [modalVisible, setModalVisible] = useState<boolean>();

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Reviews:</h5>

      {isLogged && !userReview && (
        <button type="button" onClick={showModal} className={styles.button}>
          Add review
        </button>
      )}

      {!isLogged && <p>Only authorized users may add reviews</p>}

      <ul className={styles.list}>
        {reviews?.map((review) => {
          return (
            <li key={review.id}>
              <h5>{review.title}</h5>
              <p>{review.text}</p>
              <p>{review.rate}</p>
            </li>
          );
        })}
      </ul>

      {modalVisible && (
        <ModalReview onClose={hideModal} productId={productId} />
      )}
    </div>
  );
};

export default ReviewsList;
