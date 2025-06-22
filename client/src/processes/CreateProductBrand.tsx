import { useCreateBrandMutation } from '@shared/api/brandApi';
import { IProductBrand } from '@shared/models/typesbrands';
import BrandForm from '@widgets/Admin/TypesBrands/BrandForm/BrandForm';

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
