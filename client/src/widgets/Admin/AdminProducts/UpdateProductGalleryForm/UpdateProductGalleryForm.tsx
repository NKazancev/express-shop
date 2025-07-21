import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { TUpdateGalleryData } from '@shared/models/product';
import InputFile from '@shared/ui/InputFile/InputFile';

import styles from './UpdateProductGalleryForm.module.css';

type TUpdateProductGalleryForm = {
  updateGallery: (data: TUpdateGalleryData) => void;
  apiError?: string;
};

const UpdateProductGalleryForm: FC<TUpdateProductGalleryForm> = (props) => {
  const { updateGallery, apiError } = props;

  const { register, watch, formState, handleSubmit } =
    useForm<TUpdateGalleryData>();
  const { isSubmitting, errors } = formState;
  const [image, images] = watch(['image', 'images']);

  return (
    <form onSubmit={handleSubmit(updateGallery)} className={styles.form}>
      {apiError && <strong className={styles.apiError}>{apiError}</strong>}

      <div className={styles.inputs}>
        <InputFile
          name="image"
          label="Catalogue image"
          file={image}
          register={register}
          required={false}
          error={errors.image}
          previewPosition="static"
        />
        <InputFile
          name="images"
          label="Gallery images"
          multiple={true}
          file={images}
          register={register}
          required={false}
          error={errors.images}
          previewPosition="static"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Update gallery
      </button>
    </form>
  );
};

export default UpdateProductGalleryForm;
