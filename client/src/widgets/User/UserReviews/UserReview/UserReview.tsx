import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Rating } from 'react-simple-star-rating';

import DeleteProductReview from '@processes/DeleteProductReview';
import { IUserReview } from '@shared/models/review';

import styles from './UserReview.module.css';

const UserReview: FC<IUserReview> = (review) => {
  const { id, productId, product, title, rate, text } = review;

  const navigate = useNavigate();
  const showProductPage = () => navigate(`/products/${productId}`);

  return (
    <li className={styles.review}>
      <article>
        <header>
          <h4 onClick={showProductPage} className={styles.productName}>
            {product.name}
          </h4>

          <h5 className={styles.title}>{title}</h5>

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
        </header>

        <p className={styles.text}>{text}</p>
      </article>

      <DeleteProductReview reviewId={id} />
    </li>
  );
};

export default UserReview;
