import { FC, useState, useEffect } from 'react';

import { IProductReview } from '@shared/models/product';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useLazyGetProductReviewQuery } from '@shared/api/reviewApi';
import Review from './Review/Review';
import ModalReview from '@modals/ModalReview/ModalReview';

import styles from './ProductReviews.module.css';

type TProductReviews = {
  reviews?: IProductReview[];
  productId?: string;
};

const ProductReviews: FC<TProductReviews> = ({ reviews, productId }) => {
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
      <header className={styles.header}>
        <div className={styles.info}>
          <h4 className={styles.title}>Reviews</h4>
          <span className={styles.total}>Total reviews: {reviews?.length}</span>
        </div>

        {isLogged && !userReview && (
          <button type="button" onClick={showModal} className={styles.button}>
            <span>+</span>
            <span>Add review</span>
          </button>
        )}
      </header>

      <ul className={styles.list}>
        {reviews?.map((review) => {
          return <Review key={review.id} {...review} />;
        })}
      </ul>

      {modalVisible && (
        <ModalReview onClose={hideModal} productId={productId} />
      )}
    </div>
  );
};

export default ProductReviews;
