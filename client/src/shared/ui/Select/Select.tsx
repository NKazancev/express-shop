import { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

import styles from './Select.module.css';

type TSelect = {
  name: string;
  label: string;
  options: { id: string; name: string }[] | undefined;
  firstOption: string;
  control: Control<any>;
  onChange?: (option: string) => void;
  rules: RegisterOptions;
  disabled?: boolean;
};

const Select: FC<TSelect> = ({
  name,
  label,
  options,
  firstOption,
  control,
  onChange,
  rules,
  disabled = false,
}) => {
  return (
    <p className={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={rules}
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
                style={{ pointerEvents: !disabled ? 'all' : 'none' }}
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
            </label>
          );
        }}
      />
    </p>
  );
};

export default Select;
