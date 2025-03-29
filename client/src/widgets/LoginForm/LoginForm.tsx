import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginData } from '../../shared/models/auth';

import styles from './LoginForm.module.css';

type TLoginForm = {
  onLogin: (data: ILoginData) => void;
};

const LoginForm: FC<TLoginForm> = ({ onLogin }) => {
  const { handleSubmit, register } = useForm<ILoginData>();

  return (
    <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
      <input
        type="email"
        placeholder="Email"
        autoComplete="off"
        className={styles.input}
        {...register('email', { required: true })}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        className={styles.input}
        {...register('password', { required: true })}
      />

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
