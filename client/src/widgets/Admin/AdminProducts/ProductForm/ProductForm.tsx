import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { TCreateProductData } from '@shared/models/product';
import { IProductBrand, IProductType } from '@shared/models/typesbrands';

import Input from '@shared/ui/Input/Input';
import InputFile from '@shared/ui/InputFile/InputFile';
import Textarea from '@shared/ui/Textarea/Textarea';
import Select from '@shared/ui/Select/Select';

import styles from './ProductForm.module.css';

type TProductForm = {
  onProductCreation: (data: Omit<TCreateProductData, 'id' | 'stock'>) => void;
  typeOptions: IProductType[] | undefined;
  brandOptions: IProductBrand[] | undefined;
};

const ProductForm: FC<TProductForm> = ({
  onProductCreation,
  typeOptions,
  brandOptions,
}) => {
  const { handleSubmit, register, control, watch } =
    useForm<Omit<TCreateProductData, 'id' | 'stock'>>();

  const [image, images] = watch(['image', 'images']);

  return (
    <form onSubmit={handleSubmit(onProductCreation)} className={styles.form}>
      <div className={styles.row}>
        <Input
          name="name"
          label="Name"
          control={control}
          rules={{ required: true }}
        />
        <InputFile
          name="image"
          label="Catalogue image"
          file={image}
          containerStyle={{ paddingTop: '14px' }}
          register={register}
        />
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
        <InputFile
          name="images"
          label="Gallery images"
          file={images}
          multiple={true}
          containerStyle={{ paddingTop: '14px' }}
          register={register}
        />
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
