import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ICreateReviewData } from '@shared/models/review';

import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';
import InputRating from '@shared/ui/InputRating/InputRating';

import styles from './ReviewForm.module.css';

type TReviewForm = {
  onReviewCreation: (data: ICreateReviewData) => void;
};

const ReviewForm: FC<TReviewForm> = ({ onReviewCreation }) => {
  const { control, handleSubmit } = useForm<ICreateReviewData>();
  const [rating, setRating] = useState<number>(0);

  return (
    <form onSubmit={handleSubmit(onReviewCreation)} className={styles.form}>
      <Input
        name="title"
        label="Title*"
        control={control}
        rules={{ required: true }}
      />

      <Textarea
        name="text"
        label="Text*"
        minHeight="200px"
        control={control}
        rules={{ required: true }}
      />

      <InputRating
        name="rate"
        label="Rate product*"
        value={rating}
        setValue={setRating}
        starSize="20px"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Add review
      </button>
    </form>
  );
};

export default ReviewForm;
