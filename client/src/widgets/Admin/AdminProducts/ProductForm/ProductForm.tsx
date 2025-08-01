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
  createProduct: (data: TCreateProductData) => void;
  typeOptions: IProductType[] | undefined;
  brandOptions: IProductBrand[] | undefined;
  apiError?: string;
};

const ProductForm: FC<TProductForm> = (props) => {
  const { createProduct, typeOptions, brandOptions, apiError } = props;

  const { handleSubmit, register, control, reset, watch, formState } =
    useForm<TCreateProductData>();
  const { errors, isSubmitting } = formState;

  const [image, images] = watch(['image', 'images']);

  const onSubmit = (data: TCreateProductData) => {
    createProduct(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <div className={styles.row}>
        <Input name="name" label="Name" control={control} error={errors.name} />
        <InputFile
          name="image"
          label="Catalogue image"
          file={image}
          register={register}
          error={errors.image}
          containerStyle={{ paddingTop: '14px' }}
        />
        <Textarea
          name="description"
          label="Short description"
          control={control}
          error={errors.description}
          minHeight="140px"
        />
      </div>

      <div className={styles.row}>
        <Textarea
          name="text"
          label="Full description"
          control={control}
          error={errors.text}
          minHeight="300px"
        />
        <InputFile
          name="images"
          label="Gallery images"
          multiple={true}
          file={images}
          register={register}
          error={errors.images}
          containerStyle={{ paddingTop: '14px' }}
        />
      </div>

      <div className={styles.bottom}>
        <Select
          name="typeId"
          label="Type"
          options={typeOptions}
          firstOption="Choose type"
          control={control}
          error={errors.typeId}
        />
        <Select
          name="brandId"
          label="Brand"
          options={brandOptions}
          firstOption="Choose brand"
          control={control}
          error={errors.brandId}
        />
        <Input
          type="number"
          name="price"
          label="Price"
          control={control}
          error={errors.price}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Add product
      </button>
    </form>
  );
};

export default ProductForm;
