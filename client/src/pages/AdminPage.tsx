import { useCreateProductMutation } from '../shared/api/productApi';
import { useCreateTypeMutation, useGetTypesQuery } from '../shared/api/typeApi';
import {
  useCreateBrandMutation,
  useGetBrandsQuery,
} from '../shared/api/brandApi';
import {
  IProduct,
  IProductBrand,
  IProductType,
} from '../shared/models/product';
import ProductForm from '../widgets/Admin/ProductForm/ProductForm';
import TypeForm from '../widgets/Admin/TypeForm/TypeForm';
import BrandForm from '../widgets/Admin/BrandForm/BrandForm';

function AdminPage() {
  const [createProduct] = useCreateProductMutation();
  const [createType] = useCreateTypeMutation();
  const [createBrand] = useCreateBrandMutation();
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

  const handleTypeCreation = async (data: Omit<IProductType, 'id'>) => {
    try {
      await createType(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrandCreation = async (data: Omit<IProductBrand, 'id'>) => {
    try {
      await createBrand(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <ProductForm
        onProductCreation={handleProductCreation}
        typeOptions={productTypes}
        brandOptions={productBrands}
      />
      <TypeForm onTypeCreation={handleTypeCreation} />
      <BrandForm onBrandCreation={handleBrandCreation} />
    </div>
  );
}

export default AdminPage;
