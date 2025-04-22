import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICreateUserData } from '@shared/models/user';

import styles from './RegistrationForm.module.css';

type TRegistrationForm = {
  onRegister: (data: ICreateUserData) => void;
};

const RegistrationForm: FC<TRegistrationForm> = ({ onRegister }) => {
  const { handleSubmit, register, watch } = useForm<ICreateUserData>();
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onRegister)} className={styles.form}>
      <label htmlFor="email-reg" className={styles.label}>
        <span>Email*</span>
        <input
          type="email"
          id="email-reg"
          autoComplete="off"
          className={styles.input}
          {...register('email', { required: true })}
        />
      </label>

      <label htmlFor="password-reg" className={styles.label}>
        <span>Password*</span>
        <input
          type="password"
          id="password-reg"
          autoComplete="off"
          className={styles.input}
          {...register('password', { required: true })}
        />
      </label>

      <label htmlFor="confirm-password-reg" className={styles.label}>
        <span>Confirm password*</span>
        <input
          type="password"
          id="confirm-password-reg"
          autoComplete="off"
          className={styles.input}
          {...register('confirmPassword', {
            required: true,
            validate: (formField) => {
              if (password !== formField) {
                return 'Passwords must match';
              }
            },
          })}
        />
      </label>

      <button type="submit" className={styles.button}>
        Create account
      </button>
    </form>
  );
};

export default RegistrationForm;
