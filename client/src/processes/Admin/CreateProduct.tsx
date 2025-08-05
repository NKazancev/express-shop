import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useCreateProductMutation } from '@shared/api/productApi';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { useGetBrandsQuery } from '@shared/api/brandApi';
import { TCreateProductData } from '@shared/models/product';

import ProductForm from '@widgets/Admin/AdminProducts/ProductForm/ProductForm';

const CreateProduct = () => {
  const [createProduct, { isSuccess }] = useCreateProductMutation();
  const { data: productTypes } = useGetTypesQuery();
  const { data: productBrands } = useGetBrandsQuery();

  const [error, setError] = useState<string>();

  const handleProductCreation = async (data: TCreateProductData) => {
    const { image, images, ...rest } = data;

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(rest));
      formData.append('image', image[0]);

      if (data.images) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
      const response = await createProduct(formData).unwrap();
      if (response) {
        toast.success('Product successfully created');
        setError('');
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <ProductForm
      createProduct={handleProductCreation}
      typeOptions={productTypes}
      brandOptions={productBrands}
      isSuccess={isSuccess}
      apiError={error}
    />
  );
};

export default CreateProduct;
