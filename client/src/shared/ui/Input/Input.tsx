import { CSSProperties, FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

import styles from './Input.module.css';

type TInput = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  defaultValue?: string;
  containerStyle?: CSSProperties;
  control: Control<any>;
  rules: RegisterOptions;
};

const Input: FC<TInput> = ({
  type = 'text',
  name,
  label,
  defaultValue = '',
  containerStyle,
  control,
  rules,
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
