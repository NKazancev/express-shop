import { FC } from 'react';

import { IProductReview } from '@shared/models/product';
import Review from '../Review/Review';

import styles from './ReviewsList.module.css';
import { useAppSelector } from '@shared/hooks/reduxHooks';

type TReviewsList = {
  reviews?: IProductReview[];
  userReview: IProductReview | null | undefined;
};

const ReviewsList: FC<TReviewsList> = ({ reviews, userReview }) => {
  const { isLogged } = useAppSelector((state) => state.user);

  return (
    <ul className={styles.reviews}>
      {isLogged && userReview && (
        <>
          <Review {...userReview} />
        </>
      )}
      {reviews?.map((review) => {
        return review.id !== userReview?.id ? (
          <Review key={review.id} {...review} />
        ) : null;
      })}
    </ul>
  );
};

export default ReviewsList;
