import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICreateUserData } from '@shared/models/user';
import Input from '@shared/ui/Input/Input';

import styles from './RegistrationForm.module.css';

type TRegistrationForm = {
  onRegister: (data: ICreateUserData) => void;
};

const RegistrationForm: FC<TRegistrationForm> = ({ onRegister }) => {
  const { handleSubmit, control, watch } = useForm<ICreateUserData>();
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onRegister)} className={styles.form}>
      <Input
        type="email"
        name="email"
        label="Email*"
        control={control}
        rules={{ required: true }}
      />

      <Input
        type="password"
        name="password"
        label="Password* (min 5 characters)"
        control={control}
        rules={{ required: true }}
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm password*"
        control={control}
        rules={{
          required: true,
          validate: (formField) => {
            if (password !== formField) {
              return 'Passwords must match';
            }
          },
        }}
      />

      <button type="submit" className={styles.button}>
        Create account
      </button>
    </form>
  );
};

export default RegistrationForm;
