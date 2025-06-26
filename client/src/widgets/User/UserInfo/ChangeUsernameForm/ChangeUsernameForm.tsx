import { FC } from 'react';

import { IUser } from '@shared/models/user';
import { useForm } from 'react-hook-form';
import Input from '@shared/ui/Input/Input';

import styles from './ChangeUsernameForm.module.css';

type TChangeUsernameForm = {
  onUsernameChange: (data: Pick<IUser, 'username'>) => void;
  apiError?: string;
};

const ChangeUsernameForm: FC<TChangeUsernameForm> = ({
  onUsernameChange,
  apiError,
}) => {
  const { control, handleSubmit, formState } =
    useForm<Pick<IUser, 'username'>>();
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onUsernameChange)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        name="username"
        label="New username"
        control={control}
        error={errors.username}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Confirm
      </button>
    </form>
  );
};

export default ChangeUsernameForm;
