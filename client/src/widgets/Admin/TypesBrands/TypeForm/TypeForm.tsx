import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductType } from '@shared/models/typesbrands';
import Input from '@shared/ui/Input/Input';

import styles from './TypeForm.module.css';

type TTypeForm = {
  createProductType: (data: Omit<IProductType, 'id'>) => void;
  apiError?: string;
};

const TypeForm: FC<TTypeForm> = ({ createProductType, apiError }) => {
  const { control, formState, reset, handleSubmit } =
    useForm<Omit<IProductType, 'id'>>();
  const { errors, isSubmitting } = formState;

  const onSubmit = (data: Omit<IProductType, 'id'>) => {
    createProductType(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        name="name"
        label="Type name"
        control={control}
        error={errors.name}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Add type
      </button>
    </form>
  );
};

export default TypeForm;
