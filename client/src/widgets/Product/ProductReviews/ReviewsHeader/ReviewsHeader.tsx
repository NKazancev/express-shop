import { FC } from 'react';

import { useAppSelector } from '@shared/hooks/reduxHooks';

import styles from './ReviewsHeader.module.css';

type TReviewsHeader = {
  reviewsQuantity?: number;
  isUserReview?: boolean;
  onAddButtonClick: () => void;
};

const ReviewsHeader: FC<TReviewsHeader> = ({
  reviewsQuantity,
  isUserReview,
  onAddButtonClick,
}) => {
  const { isLogged } = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <h4 className={styles.title}>Reviews</h4>

        {reviewsQuantity === 0 ? (
          <span className={styles.notification}>
            Nobody has added any review yet
          </span>
        ) : (
          <span className={styles.total}>Total reviews: {reviewsQuantity}</span>
        )}
      </div>

      {isLogged && !isUserReview && (
        <button
          type="button"
          onClick={onAddButtonClick}
          className={styles.button}
        >
          <span>+ Add review</span>
        </button>
      )}
    </header>
  );
};

export default ReviewsHeader;
