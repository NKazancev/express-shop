import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IProductData, TUpdateProductData } from '@shared/models/product';

import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';

import styles from './UpdateProductForm.module.css';

type TUpdateProductInfoForm = {
  onProductUpdate: (data: TUpdateProductData) => void;
  productData: IProductData | undefined;
};

const UpdateProductForm: FC<TUpdateProductInfoForm> = ({
  onProductUpdate,
  productData,
}) => {
  const { control, handleSubmit } = useForm<TUpdateProductData>({
    defaultValues: { ...productData, text: productData?.info.text },
    resetOptions: { keepDirtyValues: true, keepErrors: true },
  });

  return (
    <form onSubmit={handleSubmit(onProductUpdate)} className={styles.form}>
      <Input
        name="name"
        label="Name"
        control={control}
        rules={{ required: true }}
      />
      <Textarea
        name="description"
        label="Short description"
        minHeight="100px"
        control={control}
        rules={{ required: true }}
      />
      <Textarea
        name="text"
        label="Full description"
        minHeight="230px"
        control={control}
        rules={{ required: true }}
      />

      <div className={styles.row}>
        <Input
          name="price"
          label="Price"
          control={control}
          rules={{ required: true }}
        />
        <Input
          type="number"
          name="stock"
          label="Stock"
          control={control}
          rules={{ required: true }}
        />
      </div>

      <button type="submit" className={styles.button}>
        Update product
      </button>
    </form>
  );
};

export default UpdateProductForm;
