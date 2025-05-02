import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  IProductBrand,
  IProductData,
  IProductType,
} from '@shared/models/product';

import styles from './ProductForm.module.css';

type TProductForm = {
  onProductCreation: (data: Omit<IProductData, 'id'>) => void;
  typeOptions: IProductType[] | undefined;
  brandOptions: IProductBrand[] | undefined;
};

const ProductForm: FC<TProductForm> = ({
  onProductCreation,
  typeOptions,
  brandOptions,
}) => {
  const { handleSubmit, register } = useForm<Omit<IProductData, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onProductCreation)} className={styles.form}>
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

      <textarea
        placeholder="Info"
        className={styles.textarea}
        {...register('info', { required: true })}
      />

      <select
        className={styles.select}
        {...register('typeId', { required: true })}
      >
        <option value="" hidden>
          Choose type
        </option>
        {typeOptions?.map((type) => {
          return (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>

      <select
        className={styles.select}
        {...register('brandId', { required: true })}
      >
        <option value="" hidden>
          Choose brand
        </option>
        {brandOptions?.map((brand) => {
          return (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          );
        })}
      </select>

      <input type="file" className={styles.file} {...register('image')} />

      <input
        type="file"
        className={styles.file}
        {...register('gallery')}
        multiple
      />

      <button type="submit" className={styles.button}>
        Add product
      </button>
    </form>
  );
};

export default ProductForm;
