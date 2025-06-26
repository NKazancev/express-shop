import { CSSProperties, FC, HTMLInputTypeAttribute } from 'react';
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from 'react-hook-form';

import styles from './Input.module.css';

type TInput = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  control: Control<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  defaultValue?: string;
  containerStyle?: CSSProperties;
  disabled?: boolean;
};

const Input: FC<TInput> = ({
  type = 'text',
  name,
  label,
  control,
  rules = { required: `${label} is required` },
  error,
  defaultValue = '',
  containerStyle,
  disabled = false,
}) => {
  return (
    <p style={containerStyle} className={styles.container}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <label htmlFor={name}>
              <span className={styles.label}>{label}</span>

              <input
                {...field}
                type={type}
                id={name}
                min={0}
                autoComplete="off"
                disabled={disabled}
                className={styles.input}
                style={{ borderColor: error ? '#ff7474' : '#8b8b8b' }}
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

export default Input;
