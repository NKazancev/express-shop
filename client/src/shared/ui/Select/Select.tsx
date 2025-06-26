import { FC } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import styles from './Select.module.css';

type TSelect = {
  name: string;
  label: string;
  options: { id: string; name: string }[] | undefined;
  firstOption: string;
  control: Control<any>;
  error?: FieldError;
  onChange?: (option: string) => void;
  disabled?: boolean;
};

const Select: FC<TSelect> = ({
  name,
  label,
  options,
  firstOption,
  control,
  error,
  onChange,
  disabled = false,
}) => {
  return (
    <p className={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => {
          return (
            <label htmlFor={name}>
              <span className={styles.label}>{label}</span>

              <select
                {...field}
                id={name}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onChange && onChange(e.target.value);
                }}
                style={{
                  pointerEvents: !disabled ? 'all' : 'none',
                  borderColor: error ? '#ff7474' : '#8b8b8b',
                }}
                className={styles.select}
              >
                {!disabled && (
                  <option value="" hidden>
                    {firstOption}
                  </option>
                )}
                {options?.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </select>

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

export default Select;
