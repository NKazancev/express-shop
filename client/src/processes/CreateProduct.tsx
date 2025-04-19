import { useCreateProductMutation } from '@shared/api/productApi';
import { useGetTypesQuery } from '@shared/api/typeApi';
import { useGetBrandsQuery } from '@shared/api/brandApi';
import { IProduct } from '@shared/models/product';
import ProductForm from '@widgets/Admin/ProductForm/ProductForm';

function CreateProduct() {
  const [createProduct] = useCreateProductMutation();
  const { data: productTypes } = useGetTypesQuery();
  const { data: productBrands } = useGetBrandsQuery();

  const handleProductCreation = async (data: Omit<IProduct, 'id'>) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      formData.append('data', JSON.stringify(data));
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
