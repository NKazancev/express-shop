import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

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
    <BrandForm createProductBrand={handleBrandCreation} apiError={error} />
  );
}

export default CreateProductBrand;
