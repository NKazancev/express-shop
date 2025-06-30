import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductBrand } from '@shared/models/typesbrands';
import Input from '@shared/ui/Input/Input';

import styles from './BrandForm.module.css';

type TBrandForm = {
  createProductBrand: (data: Omit<IProductBrand, 'id'>) => void;
  apiError?: string;
};

const BrandForm: FC<TBrandForm> = ({ createProductBrand, apiError }) => {
  const { control, formState, reset, handleSubmit } =
    useForm<Omit<IProductBrand, 'id'>>();
  const { errors, isSubmitting } = formState;

  const onSubmit = (data: Omit<IProductBrand, 'id'>) => {
    createProductBrand(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input
        name="name"
        label="Brand name"
        control={control}
        error={errors.name}
      />

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Add brand
      </button>
    </form>
  );
};

export default BrandForm;
