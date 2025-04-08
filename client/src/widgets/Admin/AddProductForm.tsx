import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProduct, IProductType } from '../../shared/models/product';

import styles from './AddProductForm.module.css';

type TAddProductForm = {
  onProductAddition: (data: Omit<IProduct, 'id'>) => void;
  typeOptions: IProductType[] | undefined;
};

const AddProductForm: FC<TAddProductForm> = ({
  onProductAddition,
  typeOptions,
}) => {
  const { handleSubmit, register } = useForm<Omit<IProduct, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onProductAddition)} className={styles.form}>
      <input
        type="text"
        placeholder="Name"
        autoComplete="off"
        className={styles.input}
        {...register('name', { required: true })}
      />

      <input
        type="text"
        placeholder="Price"
        autoComplete="off"
        className={styles.input}
        {...register('price', { required: true })}
      />

      <textarea
        placeholder="Description"
        className={styles.textarea}
        {...register('description', { required: true })}
      />

      <select
        className={styles.select}
        {...register('typeId', { required: true })}
      >
        {typeOptions?.map((type) => {
          return (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>

      <input type="file" className={styles.file} {...register('image')} />

      <button type="submit" className={styles.button}>
        Add product
      </button>
    </form>
  );
};

export default AddProductForm;
