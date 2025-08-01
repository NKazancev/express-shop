import { FC } from 'react';

import { IUserReview } from '@shared/models/review';
import UserReview from '../UserReview/UserReview';

import styles from './UserReviewsList.module.css';

type TUserReviews = {
  reviews: IUserReview[];
};

const UserReviewsList: FC<TUserReviews> = ({ reviews }) => {
  const userReviews = reviews.map((review) => {
    return (
      <UserReview
        key={review.id}
        id={review.id}
        productId={review.productId}
        product={review.product}
        title={review.title}
        text={review.text}
        rate={review.rate}
      />
    );
  });

  return reviews.length ? (
    <ul className={styles.reviews}>{userReviews}</ul>
  ) : (
    <p className={styles.notification}>You don't have any reviews</p>
  );
};

export default UserReviewsList;
