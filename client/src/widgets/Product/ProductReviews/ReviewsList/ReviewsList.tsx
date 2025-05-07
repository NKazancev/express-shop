import { FC, useState, useEffect } from 'react';

import { IProductReview } from '@shared/models/product';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useLazyGetProductReviewQuery } from '@shared/api/reviewApi';
import ModalReview from '@modals/ModalReview/ModalReview';

import styles from './ReviewsList.module.css';

type TReviewsList = {
  reviews?: IProductReview[];
  productId?: string;
};

const ReviewsList: FC<TReviewsList> = ({ reviews, productId }) => {
  const { isLogged } = useAppSelector((state) => state.user);
  const [trigger] = useLazyGetProductReviewQuery();
  const [userReview, setUserReview] = useState<IProductReview | null>();
  const [modalVisible, setModalVisible] = useState<boolean>();

  useEffect(() => {
    if (!isLogged) setUserReview(null);
    if (isLogged && !userReview)
      trigger(productId).then((res) => setUserReview(res.data));
  }, [isLogged, userReview]);

  const showModal = () => setModalVisible(true);

  const hideModal = () => {
    setModalVisible(false);
    trigger(productId).then((res) => setUserReview(res.data));
  };

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
              <p>{review.user.email}</p>
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
