import { FC, useState, useEffect } from 'react';

import { IProductReview } from '@shared/models/review';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useLazyGetUserReviewQuery } from '@shared/api/reviewApi';

import ReviewsHeader from './ReviewsHeader/ReviewsHeader';
import ReviewsList from './ReviewsList/ReviewsList';
import ModalReview from '@modals/ModalReview/ModalReview';

import styles from './ProductReviews.module.css';

type TProductReviews = {
  reviews?: IProductReview[];
  productId?: string;
};

const ProductReviews: FC<TProductReviews> = ({ reviews, productId }) => {
  const { isLogged } = useAppSelector((state) => state.user);
  const [trigger] = useLazyGetUserReviewQuery();
  const [userReview, setUserReview] = useState<IProductReview | null>();

  const [modalVisible, setModalVisible] = useState<boolean>();
  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
    trigger(productId).then((res) => setUserReview(res.data));
  };

  useEffect(() => {
    if (!isLogged) setUserReview(null);
    if (isLogged && !userReview && productId)
      trigger(productId).then((res) => setUserReview(res.data));
  }, [isLogged, userReview, productId]);

  return (
    <div className={styles.container}>
      <ReviewsHeader
        reviewsQuantity={reviews?.length}
        isUserReview={Boolean(userReview)}
        onAddButtonClick={showModal}
      />
      {reviews && <ReviewsList reviews={reviews} userReview={userReview} />}

      {modalVisible && (
        <ModalReview onClose={hideModal} productId={productId} />
      )}
    </div>
  );
};

export default ProductReviews;
