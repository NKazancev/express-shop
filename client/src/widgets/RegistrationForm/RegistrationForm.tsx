import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IRegistrationUserData } from '../../shared/models/user';

import styles from './RegistrationForm.module.css';

type TRegistrationForm = {
  onRegister: (data: IRegistrationUserData) => void;
};

const RegistrationForm: FC<TRegistrationForm> = ({ onRegister }) => {
  const { handleSubmit, register, watch } = useForm<IRegistrationUserData>();
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onRegister)} className={styles.form}>
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

      <input
        type="password"
        placeholder="Confirm password"
        autoComplete="off"
        className={styles.input}
        {...register('repeatPassword', {
          required: true,
          validate: (formField) => {
            if (password !== formField) {
              return 'Passwords must match';
            }
          },
        })}
      />

      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
