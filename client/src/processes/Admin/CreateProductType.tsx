import { useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

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
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return <TypeForm createProductType={handleTypeCreation} apiError={error} />;
}

export default CreateProductType;
