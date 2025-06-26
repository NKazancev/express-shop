import { FC } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import styles from './InputRating.module.css';

type TInputRating = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  value: number;
  setValue: (value: number) => void;
  defaultValue?: string;
  starSize: string;
};

const InputRating: FC<TInputRating> = ({
  name,
  label,
  control,
  error,
  value,
  setValue,
  defaultValue = '',
  starSize,
}) => {
  return (
    <p className={styles.container}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={{ required: 'Rate is required' }}
        render={({ field }) => {
          return (
            <label htmlFor={name} className={styles.rating}>
              <span>{label}</span>

              <input
                {...field}
                type="number"
                id={name}
                value={value}
                className="visually-hidden"
              />

              <Rating
                iconsCount={10}
                initialValue={value}
                SVGstyle={{ width: starSize, height: starSize }}
                style={{ height: starSize }}
                fillColor="#ffd76d"
                onClick={(value) => {
                  field.onChange(value);
                  setValue(value);
                }}
              />

              {error?.message && (
                <strong className={styles.error}>{error?.message}</strong>
              )}
            </label>
          );
        }}
      />
    </p>
  );
};

export default InputRating;
