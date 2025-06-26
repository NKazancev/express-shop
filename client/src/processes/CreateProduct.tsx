import { useCreateProductMutation } from '@shared/api/productApi';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { useGetBrandsQuery } from '@shared/api/brandApi';
import { TCreateProductData } from '@shared/models/product';

import ProductForm from '@widgets/Admin/AdminProducts/ProductForm/ProductForm';
import { useState } from 'react';

function CreateProduct() {
  const [createProduct] = useCreateProductMutation();
  const { data: productTypes } = useGetTypesQuery();
  const { data: productBrands } = useGetBrandsQuery();

  const [error, setError] = useState<string>();

  const handleProductCreation = async (
    data: Omit<TCreateProductData, 'id' | 'stock'>
  ) => {
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
      await createProduct(formData).unwrap();
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ProductForm
      onProductCreation={handleProductCreation}
      typeOptions={productTypes}
      brandOptions={productBrands}
      apiError={error}
    />
  );
}

export default CreateProduct;
