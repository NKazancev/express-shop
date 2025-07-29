import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { TProductData, TUpdateProductData } from '@shared/models/product';

import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';

import styles from './UpdateProductInfoForm.module.css';

type TUpdateProductInfoForm = {
  onProductUpdate: (data: TUpdateProductData) => void;
  productData: TProductData | undefined;
  apiError?: string;
};

const UpdateProductForm: FC<TUpdateProductInfoForm> = (props) => {
  const { onProductUpdate, productData, apiError } = props;

  const { control, handleSubmit, formState } = useForm<TUpdateProductData>({
    defaultValues: { ...productData, text: productData?.info.text },
    resetOptions: { keepDirtyValues: true, keepErrors: true },
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onProductUpdate)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <Input name="name" label="Name" control={control} error={errors.name} />
      <Textarea
        name="description"
        label="Short description"
        minHeight="100px"
        control={control}
        error={errors.description}
      />
      <Textarea
        name="text"
        label="Full description"
        minHeight="230px"
        control={control}
        error={errors.text}
      />

      <div className={styles.row}>
        <Input
          name="price"
          label="Price"
          control={control}
          error={errors.price}
        />
        <Input
          type="number"
          name="stock"
          label="Stock"
          control={control}
          error={errors.stock}
        />
      </div>

      <button type="submit" className={styles.button}>
        Update product
      </button>
    </form>
  );
};

export default UpdateProductForm;
