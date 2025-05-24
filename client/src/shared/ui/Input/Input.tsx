import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

import styles from './Input.module.css';

type TInput = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  defaultValue?: string;
  control: Control<any>;
  rules: RegisterOptions;
};

const Input: FC<TInput> = ({
  type = 'text',
  name,
  label,
  defaultValue = '',
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
            <label htmlFor={name}>
              <span className={styles.label}>{label}</span>

              <input
                {...field}
                type={type}
                id={name}
                autoComplete="off"
                className={styles.input}
              />
            </label>
          );
        }}
      />
    </p>
  );
};

export default Input;
