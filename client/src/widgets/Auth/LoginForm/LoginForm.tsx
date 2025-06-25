import { FC } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

import { ILoginData } from '@shared/models/auth';
import Input from '@shared/ui/Input/Input';

import styles from './LoginForm.module.css';

type TLoginForm = {
  onLogin: (data: ILoginData) => void;
  loginError?: string;
};

const LoginForm: FC<TLoginForm> = ({ onLogin, loginError }) => {
  const { handleSubmit, control, formState } = useForm<ILoginData>();
  const { isSubmitting, errors } = formState;

  const rules: { [key: string]: RegisterOptions } = {
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
  };

  return (
    <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
      {loginError && (
        <strong className={styles.loginError}>{loginError}</strong>
      )}

      <Input
        type="email"
        name="email"
        label="Email"
        control={control}
        rules={rules.email}
        error={errors.email}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        control={control}
        rules={rules.password}
        error={errors.password}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
