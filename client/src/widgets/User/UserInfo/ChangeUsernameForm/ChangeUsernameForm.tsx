import { FC } from 'react';

import { IUser } from '@shared/models/user';
import { useForm } from 'react-hook-form';
import Input from '@shared/ui/Input/Input';

import styles from './ChangeUsernameForm.module.css';

type TChangeUsernameForm = {
  onUsernameChange: (data: Pick<IUser, 'username'>) => void;
};

const ChangeUsernameForm: FC<TChangeUsernameForm> = ({ onUsernameChange }) => {
  const { control, handleSubmit } = useForm<Pick<IUser, 'username'>>();

  return (
    <form onSubmit={handleSubmit(onUsernameChange)} className={styles.form}>
      <Input
        name="username"
        label="New username"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Confirm
      </button>
    </form>
  );
};

export default ChangeUsernameForm;
