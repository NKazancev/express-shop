import { FC } from 'react';
import { Rating } from 'react-simple-star-rating';

import { IProductReview } from '@shared/models/product';

import styles from './Review.module.css';

const Review: FC<IProductReview> = ({ title, text, rate, user }) => {
  return (
    <li>
      <article className={styles.review}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>

          <div className={styles.info}>
            <span className={styles.author}>Author:</span>
            <span>{user.email}</span>
          </div>
        </header>

        <div className={styles.rating}>
          <span>Rating:</span>
          <Rating
            iconsCount={10}
            initialValue={Number(rate)}
            SVGstyle={{ width: '20px', height: '20px' }}
            fillColor="#ffd76d"
            style={{
              height: '20px',
              pointerEvents: 'none',
            }}
          />
        </div>

        <p className={styles.text}>{text}</p>
      </article>
    </li>
  );
};

export default Review;
