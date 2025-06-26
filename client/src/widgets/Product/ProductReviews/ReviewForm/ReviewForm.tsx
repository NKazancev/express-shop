import { FC, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

import { ICreateReviewData } from '@shared/models/review';

import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';
import InputRating from '@shared/ui/InputRating/InputRating';

import styles from './ReviewForm.module.css';

type TReviewForm = {
  onReviewCreation: (data: ICreateReviewData) => void;
  apiError?: string;
};

const ReviewForm: FC<TReviewForm> = ({ onReviewCreation, apiError }) => {
  const { control, handleSubmit, formState } = useForm<ICreateReviewData>();
  const { errors, isSubmitting } = formState;

  const [rating, setRating] = useState<number>(0);

  const rules: { [key: string]: RegisterOptions } = {
    title: {
      required: 'Title is required',
      minLength: { value: 5, message: 'Title is too short' },
    },
    text: {
      required: 'Text is required',
      minLength: {
        value: 100,
        message: 'Review text should be at least 100 symbols',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onReviewCreation)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        name="title"
        label="Title*"
        control={control}
        rules={rules.title}
        error={errors.title}
      />

      <Textarea
        name="text"
        label="Text*"
        control={control}
        rules={rules.text}
        error={errors.text}
        minHeight="200px"
      />

      <InputRating
        name="rate"
        label="Rate product*"
        control={control}
        error={errors.rate}
        value={rating}
        setValue={setRating}
        starSize="20px"
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Add review
      </button>
    </form>
  );
};

export default ReviewForm;
