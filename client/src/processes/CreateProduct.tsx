import { useCreateProductMutation } from '@shared/api/productApi';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { useGetBrandsQuery } from '@shared/api/brandApi';
import { ICreateProductData } from '@shared/models/product';

import ProductForm from '@widgets/Admin/AdminProducts/ProductForm/ProductForm';

function CreateProduct() {
  const [createProduct] = useCreateProductMutation();
  const { data: productTypes } = useGetTypesQuery();
  const { data: productBrands } = useGetBrandsQuery();

  const handleProductCreation = async (
    data: Omit<ICreateProductData, 'id' | 'stock'>
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductForm
      onProductCreation={handleProductCreation}
      typeOptions={productTypes}
      brandOptions={productBrands}
    />
  );
}

export default CreateProduct;
