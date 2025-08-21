import { FC } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

import { IPasswordData } from '@shared/models/user';
import Input from '@shared/ui/Input/Input';

import styles from './ChangePasswordForm.module.css';

type TChangePasswordForm = {
  onPasswordChange: (data: IPasswordData) => void;
  apiError?: string;
};

const ChangePasswordForm: FC<TChangePasswordForm> = (props) => {
  const { onPasswordChange, apiError } = props;

  const { control, watch, handleSubmit, formState } = useForm<IPasswordData>();
  const { errors, isSubmitting } = formState;

  const newPassword = watch('newPassword');

  const rules: { [key: string]: RegisterOptions } = {
    oldPassword: { required: 'Old password is required' },
    newPassword: {
      required: 'New password is required',
      minLength: { value: 5, message: 'Password is too short' },
      maxLength: { value: 40, message: 'Password is too long' },
      validate: (value) => {
        if (value.includes(' ')) {
          return "Password shouldn't contain spaces";
        }
      },
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (field) => {
        if (field !== newPassword) {
          return 'Passwords must match';
        }
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onPasswordChange)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        type="password"
        name="oldPassword"
        label="Old password*"
        control={control}
        rules={rules.oldPassword}
        error={errors.oldPassword}
      />
      <Input
        type="password"
        name="newPassword"
        label="New password*"
        control={control}
        rules={rules.newPassword}
        error={errors.newPassword}
      />
      <Input
        type="password"
        name="confirmPassword"
        label="Confirm password*"
        control={control}
        rules={rules.confirmPassword}
        error={errors.confirmPassword}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Confirm
      </button>
    </form>
  );
};

export default ChangePasswordForm;
