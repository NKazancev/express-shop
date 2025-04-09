import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductBrand } from '../../../shared/models/product';

import styles from './BrandForm.module.css';

type TBrandForm = {
  onBrandCreation: (data: Omit<IProductBrand, 'id'>) => void;
};

const BrandForm: FC<TBrandForm> = ({ onBrandCreation }) => {
  const { register, handleSubmit } = useForm<Omit<IProductBrand, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onBrandCreation)} className={styles.form}>
      <input
        type="text"
        placeholder="Brand"
        autoComplete="off"
        className={styles.input}
        {...register('name', { required: true })}
      />

      <button type="submit" className={styles.button}>
        Add brand
      </button>
    </form>
  );
};

export default BrandForm;
