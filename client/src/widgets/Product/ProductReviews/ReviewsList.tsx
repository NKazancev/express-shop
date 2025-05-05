import { FC } from 'react';
import { IProductReview } from '@shared/models/product';

import styles from './ReviewsList.module.css';

type TReviewsList = {
  reviews: IProductReview[] | undefined;
};

const ReviewsList: FC<TReviewsList> = ({ reviews }) => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ReviewsList;
