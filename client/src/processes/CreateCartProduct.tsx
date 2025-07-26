import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useCreateCartProductMutation } from '@shared/api/cartApi';
import { useAppSelector } from '@shared/hooks/reduxHooks';

import ModalLogin from '@modals/ModalLogin/ModalLogin';

type TCreateCartProduct = {
  productId: string | undefined;
  buttonStyle: string;
};

const CreateCartProduct: FC<TCreateCartProduct> = (props) => {
  const { productId, buttonStyle } = props;

  const { isLogged } = useAppSelector((state) => state.user);
  const [createCartProduct] = useCreateCartProductMutation();

  const [modalLoginVisible, setModalLoginVisible] = useState<boolean>(false);
  const hideModal = () => setModalLoginVisible(false);

  const addProductToCart = async () => {
    if (!isLogged) {
      setModalLoginVisible(true);
      return;
    }
    try {
      await createCartProduct({ productId, quantity: 1 }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <button type="button" onClick={addProductToCart} className={buttonStyle}>
        Add to cart
      </button>

      {modalLoginVisible && <ModalLogin onClose={hideModal} />}
    </>
  );
};

export default CreateCartProduct;
