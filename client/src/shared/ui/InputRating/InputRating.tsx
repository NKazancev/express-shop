import { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import styles from './InputRating.module.css';

type TInputRating = {
  name: string;
  label: string;
  value: number;
  setValue: (value: number) => void;
  defaultValue?: string;
  starSize: string;
  control: Control<any>;
  rules: RegisterOptions;
};

const InputRating: FC<TInputRating> = ({
  name,
  label,
  value,
  setValue,
  defaultValue = '',
  starSize,
  control,
  rules,
}) => {
  return (
    <p className={styles.container}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
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
            </label>
          );
        }}
      />
    </p>
  );
};

export default InputRating;
