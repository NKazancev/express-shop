import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginData } from '@shared/models/auth';

import styles from './LoginForm.module.css';

type TLoginForm = {
  onLogin: (data: ILoginData) => void;
};

const LoginForm: FC<TLoginForm> = ({ onLogin }) => {
  const { handleSubmit, register } = useForm<ILoginData>();

  return (
    <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
      <label htmlFor="email-login-field" className={styles.label}>
        <span>Email</span>
        <input
          type="email"
          id="email-login-field"
          autoComplete="off"
          className={styles.input}
          {...register('email', { required: true })}
        />
      </label>

      <label htmlFor="password-login-field" className={styles.label}>
        <span>Password</span>
        <input
          type="password"
          id="password-login-field"
          autoComplete="off"
          className={styles.input}
          {...register('password', { required: true })}
        />
      </label>

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
