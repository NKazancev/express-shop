import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { TUpdateProductData } from '@shared/models/product';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@shared/api/productApi';

import UpdateProductForm from '@widgets/Admin/AdminProducts/UpdateProductInfoForm/UpdateProductInfoForm';

type TUpdateProductInfo = {
  productId: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const UpdateProductInfo: FC<TUpdateProductInfo> = (props) => {
  const { productId, setIsSuccess } = props;

  const { data: productData, fulfilledTimeStamp } =
    useGetProductByIdQuery(productId);
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  const [error, setError] = useState<string>();

  const handleProductUpdate = async (data: TUpdateProductData) => {
    try {
      const price = Number(data.price);
      const stock = Number(data.stock);
      await updateProduct({ id: productId, ...data, price, stock }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) setIsSuccess(true);
  }, [isSuccess]);

  return (
    <>
      <UpdateProductForm
        key={`update-product-${fulfilledTimeStamp}`}
        onProductUpdate={handleProductUpdate}
        productData={productData}
        apiError={error}
      />
    </>
  );
};

export default UpdateProductInfo;
