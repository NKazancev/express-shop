import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductType } from '../../../shared/models/product';

import styles from './TypeForm.module.css';

type TTypeForm = {
  onTypeCreation: (data: Omit<IProductType, 'id'>) => void;
};

const TypeForm: FC<TTypeForm> = ({ onTypeCreation }) => {
  const { register, handleSubmit } = useForm<Omit<IProductType, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onTypeCreation)} className={styles.form}>
      <input
        type="text"
        placeholder="Type"
        autoComplete="off"
        className={styles.input}
        {...register('name', { required: true })}
      />

      <button type="submit" className={styles.button}>
        Add type
      </button>
    </form>
  );
};

export default TypeForm;
