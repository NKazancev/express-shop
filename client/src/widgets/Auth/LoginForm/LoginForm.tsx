import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginData } from '@shared/models/auth';
import Input from '@shared/ui/Input/Input';

import styles from './LoginForm.module.css';

type TLoginForm = {
  onLogin: (data: ILoginData) => void;
  apiError?: string;
};

const LoginForm: FC<TLoginForm> = ({ onLogin, apiError }) => {
  const { handleSubmit, control, formState } = useForm<ILoginData>();
  const { isSubmitting, errors } = formState;

  return (
    <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        type="email"
        name="email"
        label="Email"
        control={control}
        error={errors.email}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        control={control}
        error={errors.password}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
