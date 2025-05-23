import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ILoginData } from '@shared/models/auth';
import Input from '@shared/ui/Input/Input';

import styles from './LoginForm.module.css';

type TLoginForm = {
  onLogin: (data: ILoginData) => void;
};

const LoginForm: FC<TLoginForm> = ({ onLogin }) => {
  const { handleSubmit, control } = useForm<ILoginData>();

  return (
    <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
      <Input
        type="email"
        name="email"
        label="Email"
        control={control}
        rules={{ required: true }}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
