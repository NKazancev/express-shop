import { useCreateBrandMutation } from '@shared/api/brandApi';
import { IProductBrand } from '@shared/models/product';
import BrandForm from '@widgets/Admin/BrandForm/BrandForm';

function CreateProductBrand() {
  const [createBrand] = useCreateBrandMutation();

  const handleBrandCreation = async (data: Omit<IProductBrand, 'id'>) => {
    try {
      await createBrand(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return <BrandForm onBrandCreation={handleBrandCreation} />;
}

export default CreateProductBrand;
