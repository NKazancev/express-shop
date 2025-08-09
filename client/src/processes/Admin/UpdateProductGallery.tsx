import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { TUpdateGalleryData } from '@shared/models/product';
import { useUpdateProductGalleryMutation } from '@shared/api/productApi';

import UpdateProductGalleryForm from '@widgets/Admin/AdminProducts/UpdateProductGalleryForm/UpdateProductGalleryForm';

type TUpdateProductGallery = {
  productId: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const UpdateProductGallery: FC<TUpdateProductGallery> = (props) => {
  const { productId, setIsSuccess } = props;

  const [updateProductGallery, { isSuccess }] =
    useUpdateProductGalleryMutation();

  const [error, setError] = useState<string>();

  const handleGalleryUpdate = async (data: TUpdateGalleryData) => {
    setError('');
    try {
      const { image, images } = data;
      const formData = new FormData();
      formData.append('data', JSON.stringify({ productId }));
      formData.append('image', image[0]);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      await updateProductGallery(formData).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) setIsSuccess(true);
  }, [isSuccess]);

  return (
    <UpdateProductGalleryForm
      updateGallery={handleGalleryUpdate}
      apiError={error}
    />
  );
};

export default UpdateProductGallery;
