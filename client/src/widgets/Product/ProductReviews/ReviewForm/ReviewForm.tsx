import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import { ICreateReviewData } from '@shared/models/product';

import styles from './ReviewForm.module.css';

type TReviewForm = {
  onReviewCreation: (data: ICreateReviewData) => void;
};

const ReviewForm: FC<TReviewForm> = ({ onReviewCreation }) => {
  const { register, handleSubmit } = useForm<ICreateReviewData>();
  const [rating, setRating] = useState<number>(0);

  return (
    <form onSubmit={handleSubmit(onReviewCreation)} className={styles.form}>
      <label htmlFor="title-review" className={styles.label}>
        <span>Title*</span>
        <input
          type="text"
          id="title-review"
          autoComplete="off"
          className={styles.input}
          {...register('title', { required: true })}
        />
      </label>

      <label htmlFor="text-review" className={styles.label}>
        <span>Text*</span>
        <textarea
          id="text-review"
          className={styles.textarea}
          {...register('text', { required: true })}
        />
      </label>

      <label htmlFor="rating-review" className={styles.rating}>
        <span>Rate product*</span>
        <input
          type="number"
          id="rating-review"
          value={rating}
          className="visually-hidden"
          {...register('rate', { required: true })}
        />

        <Rating
          iconsCount={10}
          initialValue={rating}
          SVGstyle={{ width: '20px', height: '20px' }}
          fillColor="#ffd76d"
          style={{ height: '20px' }}
          onClick={(rate) => setRating(rate)}
        />
      </label>

      <button type="submit" className={styles.button}>
        Add review
      </button>
    </form>
  );
};

export default ReviewForm;
