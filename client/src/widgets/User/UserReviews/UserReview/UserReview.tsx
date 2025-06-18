import { FC } from 'react';
import { useNavigate } from 'react-router';

import { useDeleteReviewMutation } from '@shared/api/reviewApi';
import { IUserReview } from '@shared/models/review';
import { Rating } from 'react-simple-star-rating';

import xbutton from '@shared/assets/x-button.svg';
import styles from './UserReview.module.css';

const UserReview: FC<IUserReview> = (review) => {
  const { id, productId, product, title, rate, text } = review;
  const [deleteReview] = useDeleteReviewMutation();

  const navigate = useNavigate();
  const showProductPage = () => navigate(`/products/${productId}`);

  const handleReviewDelete = async () => {
    try {
      await deleteReview(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

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

      <button
        type="button"
        onClick={handleReviewDelete}
        className={styles.button}
      >
        <img src={xbutton} alt="x" width={13} />
      </button>
    </li>
  );
};

export default UserReview;
