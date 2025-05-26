import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  ICreateProductData,
  IProductBrand,
  IProductType,
} from '@shared/models/product';

import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';
import Select from '@shared/ui/Select/Select';

import styles from './ProductForm.module.css';

type TProductForm = {
  onProductCreation: (data: Omit<ICreateProductData, 'id'>) => void;
  typeOptions: IProductType[] | undefined;
  brandOptions: IProductBrand[] | undefined;
};

const ProductForm: FC<TProductForm> = ({
  onProductCreation,
  typeOptions,
  brandOptions,
}) => {
  const { handleSubmit, register, control } =
    useForm<Omit<ICreateProductData, 'id'>>();

  return (
    <form onSubmit={handleSubmit(onProductCreation)} className={styles.form}>
      <div className={styles.row}>
        <Input
          name="name"
          label="Name"
          control={control}
          rules={{ required: true }}
        />
        <div className={styles.file}>
          <label htmlFor="images">Catalogue image</label>
          <input
            type="file"
            className="visually-hidden"
            {...register('image')}
          />
        </div>
      </div>

      <div className={styles.row}>
        <Textarea
          name="description"
          label="Short description"
          minHeight="140px"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <div className={styles.row}>
        <Textarea
          name="text"
          label="Full description"
          minHeight="300px"
          control={control}
          rules={{ required: true }}
        />
        <div className={styles.file}>
          <label htmlFor="images">Gallery images</label>
          <input
            type="file"
            id="images"
            className="visually-hidden"
            {...register('images')}
            multiple
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <Select
          name="typeId"
          label="Type"
          options={typeOptions}
          firstOption="Choose type"
          control={control}
          rules={{ required: true }}
        />
        <Select
          name="brandId"
          label="Brand"
          options={brandOptions}
          firstOption="Choose brand"
          control={control}
          rules={{ required: true }}
        />
        <Input
          name="price"
          label="Price"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <button type="submit" className={styles.button}>
        Add product
      </button>
    </form>
  );
};

export default ProductForm;
