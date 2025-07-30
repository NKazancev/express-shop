import { FC } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

import { TCreateUserData } from '@shared/models/user';
import Input from '@shared/ui/Input/Input';

import styles from './RegistrationForm.module.css';

type TRegistrationForm = {
  onRegister: (data: TCreateUserData) => void;
  apiError?: string;
};

const RegistrationForm: FC<TRegistrationForm> = (props) => {
  const { onRegister, apiError } = props;

  const { handleSubmit, control, watch, formState } =
    useForm<TCreateUserData>();
  const { errors, isSubmitting } = formState;

  const password = watch('password');

  const rules: { [key: string]: RegisterOptions } = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@[a-z]+\.[a-z]+$/,
        message: 'Wrong email format',
      },
    },
    password: {
      required: 'Password is required',
      minLength: { value: 5, message: 'Password is too short' },
      maxLength: { value: 40, message: 'Password is too long' },
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (field) => {
        if (password !== field) {
          return 'Passwords must match';
        }
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onRegister)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        type="email"
        name="email"
        label="Email*"
        control={control}
        rules={rules.email}
        error={errors.email}
      />
      <Input
        type="password"
        name="password"
        label="Password* (min 5 characters)"
        control={control}
        rules={rules.password}
        error={errors.password}
      />
      <Input
        type="password"
        name="confirmPassword"
        label="Confirm password*"
        control={control}
        rules={rules.confirmPassword}
        error={errors.confirmPassword}
      />

      <button disabled={isSubmitting} type="submit" className={styles.button}>
        Create account
      </button>
    </form>
  );
};

export default RegistrationForm;
