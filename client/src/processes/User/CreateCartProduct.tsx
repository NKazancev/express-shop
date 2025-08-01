import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import UserRole from '@config/userRoles';
import baseApi from '@config/baseApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useCreateCartProductMutation } from '@shared/api/cartApi';
import { useAppDispatch, useAppSelector } from '@shared/hooks/reduxHooks';

import ModalLogin from '@modals/ModalLogin/ModalLogin';

type TCreateCartProduct = {
  productId: string;
  buttonStyle: string;
};

const CreateCartProduct: FC<TCreateCartProduct> = (props) => {
  const { productId, buttonStyle } = props;

  const { isLogged, role } = useAppSelector((state) => state.user);
  const [createCartProduct] = useCreateCartProductMutation();
  const dispatch = useAppDispatch();

  const [modalLoginVisible, setModalLoginVisible] = useState<boolean>(false);
  const hideModal = () => setModalLoginVisible(false);

  const addProductToCart = async () => {
    if (role === UserRole.ADMIN) return;

    if (!isLogged) {
      setModalLoginVisible(true);
      return;
    }
    try {
      await createCartProduct({ productId, quantity: 1 }).unwrap();
      dispatch(baseApi.util.invalidateTags(['Users']));
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
