import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IPasswordData } from '@shared/models/user';
import Input from '@shared/ui/Input/Input';

import styles from './ChangePasswordForm.module.css';

type TChangePasswordForm = {
  onPasswordChange: (data: IPasswordData) => void;
};

const ChangePasswordForm: FC<TChangePasswordForm> = ({ onPasswordChange }) => {
  const { control, watch, handleSubmit } = useForm<IPasswordData>();
  const newPassword = watch('newPassword');

  return (
    <form onSubmit={handleSubmit(onPasswordChange)} className={styles.form}>
      <Input
        type="password"
        name="oldPassword"
        label="Old password*"
        control={control}
        rules={{ required: true }}
      />
      <Input
        type="password"
        name="newPassword"
        label="New password*"
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
            if (formField !== newPassword) {
              console.log('Passwords must match');
              return 'Passwords must match';
            }
          },
        }}
      />

      <button type="submit" className={styles.button}>
        Confirm
      </button>
    </form>
  );
};

export default ChangePasswordForm;
