import { useState } from 'react';

import { useCreateTypeMutation } from '@shared/api/typeApi';
import { IProductType } from '@shared/models/typesbrands';

import TypeForm from '@widgets/Admin/TypesBrands/TypeForm/TypeForm';

function CreateProductType() {
  const [createType] = useCreateTypeMutation();

  const [error, setError] = useState<string>('');

  const handleTypeCreation = async (data: Omit<IProductType, 'id'>) => {
    try {
      const response = await createType(data.name).unwrap();
      if (response) setError('');
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return <TypeForm createProductType={handleTypeCreation} apiError={error} />;
}

export default CreateProductType;
