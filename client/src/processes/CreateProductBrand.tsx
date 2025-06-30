import { useState } from 'react';

import { useCreateBrandMutation } from '@shared/api/brandApi';
import { IProductBrand } from '@shared/models/typesbrands';

import BrandForm from '@widgets/Admin/TypesBrands/BrandForm/BrandForm';

function CreateProductBrand() {
  const [createBrand] = useCreateBrandMutation();

  const [error, setError] = useState<string>();

  const handleBrandCreation = async (data: Omit<IProductBrand, 'id'>) => {
    try {
      const response = await createBrand(data.name).unwrap();
      if (response) setError('');
    } catch (error: any) {
      if ('status' in error) {
        setError(error.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <BrandForm createProductBrand={handleBrandCreation} apiError={error} />
  );
}

export default CreateProductBrand;
