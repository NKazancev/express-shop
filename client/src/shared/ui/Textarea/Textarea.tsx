import { FC } from 'react';
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form';

import styles from './Textarea.module.css';

type TTextarea = {
  name: string;
  label: string;
  control: Control<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  defaultValue?: string;
  minHeight: string;
};

const Textarea: FC<TTextarea> = ({
  name,
  label,
  control,
  error,
  defaultValue = '',
  minHeight,
  rules = {
    required: `${label} is required`,
    pattern: { value: /\S+$/, message: 'Wrong value' },
  },
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
            <label htmlFor={name}>
              <span className={styles.label}>{label}</span>

              <textarea
                {...field}
                id={name}
                value={field.value.replace(/ {2,}/, ' ')}
                style={{
                  minHeight,
                  borderColor: error ? '#ff7474' : '#8b8b8b',
                }}
                className={styles.textarea}
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

export default Textarea;
