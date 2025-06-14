import { FC } from 'react';
import { Rating } from 'react-simple-star-rating';

import { IProductReview } from '@shared/models/review';

import authorIcon from '@shared/assets/author-icon.svg';
import styles from './Review.module.css';

const Review: FC<Partial<IProductReview>> = ({ title, text, rate, user }) => {
  return (
    <li>
      <article className={styles.review}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>

          <div className={styles.info}>
            <div className={styles.author}>
              <img src={authorIcon} alt="author-icon" />
              <span>{user?.username}</span>
            </div>

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
          </div>
        </header>

        <p className={styles.text}>{text}</p>
      </article>
    </li>
  );
};

export default Review;
