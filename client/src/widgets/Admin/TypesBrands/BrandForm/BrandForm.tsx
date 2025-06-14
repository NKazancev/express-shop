import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductBrand } from '@shared/models/typesbrands';
import Input from '@shared/ui/Input/Input';

import styles from './BrandForm.module.css';

type TBrandForm = {
  onBrandCreation: (data: Omit<IProductBrand, 'id'>) => void;
};

const BrandForm: FC<TBrandForm> = ({ onBrandCreation }) => {
  const { control, handleSubmit } = useForm<Omit<IProductBrand, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onBrandCreation)} className={styles.form}>
      <Input
        name="name"
        label="Brand name"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" className={styles.button}>
        Add brand
      </button>
    </form>
  );
};

export default BrandForm;
