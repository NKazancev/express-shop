import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductType } from '@shared/models/product';
import Input from '@shared/ui/Input/Input';

import styles from './TypeForm.module.css';

type TTypeForm = {
  onTypeCreation: (data: Omit<IProductType, 'id'>) => void;
};

const TypeForm: FC<TTypeForm> = ({ onTypeCreation }) => {
  const { control, handleSubmit } = useForm<Omit<IProductType, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onTypeCreation)} className={styles.form}>
      <Input
        name="name"
        label="Type name"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Add type
      </button>
    </form>
  );
};

export default TypeForm;
