import { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

import styles from './Textarea.module.css';

type TTextarea = {
  name: string;
  label: string;
  minHeight: string;
  defaultValue?: string;
  control: Control<any>;
  rules: RegisterOptions;
};

const Textarea: FC<TTextarea> = ({
  name,
  label,
  minHeight,
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

              <textarea
                {...field}
                id={name}
                style={{ minHeight }}
                className={styles.textarea}
              />
            </label>
          );
        }}
      />
    </p>
  );
};

export default Textarea;
