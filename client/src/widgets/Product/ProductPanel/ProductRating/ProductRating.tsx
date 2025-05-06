import { FC, useMemo } from 'react';
import { Rating } from 'react-simple-star-rating';

import { IProductReview } from '@shared/models/product';

import styles from './ProductRating.module.css';

type TProductRating = {
  reviews: IProductReview[] | undefined;
};

const ProductRating: FC<TProductRating> = ({ reviews }) => {
  const rating = useMemo(() => {
    const ratingSum = reviews?.reduce(
      (acc, el) => (acc += parseInt(el.rate)),
      0
    );
    const totalVotes = reviews?.length;
    return ratingSum && totalVotes && ratingSum / totalVotes;
  }, [reviews]);

  return (
    <div className={styles.container}>
      <span>Rating:</span>

      <div className={styles.stars}>
        <Rating
          iconsCount={10}
          allowFraction={true}
          initialValue={rating}
          SVGstyle={{ width: '24px', height: '24px' }}
          fillColor="#ffd76d"
          style={{
            height: '24px',
            pointerEvents: 'none',
          }}
        />
        <span className={styles.votes}>(votes: {reviews?.length})</span>
      </div>
    </div>
  );
};

export default ProductRating;
