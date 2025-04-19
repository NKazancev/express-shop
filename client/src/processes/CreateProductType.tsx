import { useCreateTypeMutation } from '@shared/api/typeApi';
import { IProductType } from '@shared/models/product';
import TypeForm from '@widgets/Admin/TypeForm/TypeForm';

function CreateProductType() {
  const [createType] = useCreateTypeMutation();

  const handleTypeCreation = async (data: Omit<IProductType, 'id'>) => {
    try {
      await createType(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return <TypeForm onTypeCreation={handleTypeCreation} />;
}

export default CreateProductType;
