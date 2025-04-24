import { useState } from 'react';

import { useCreateCartProductMutation } from '@shared/api/cartApi';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import ModalLogin from '@modals/ModalLogin';

const UserActions = ({ id }: { id: string }) => {
  const { isLogged } = useAppSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [createCartProduct] = useCreateCartProductMutation();

  const addProductToCart = async () => {
    if (!isLogged) {
      setModalVisible(true);
      return;
    }
    try {
      await createCartProduct({ quantity: 1, productId: id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const hideModal = () => setModalVisible(false);

  return (
    <>
      <button type="button" onClick={addProductToCart}>
        Add to cart
      </button>

      {modalVisible && <ModalLogin onClose={hideModal} />}
    </>
  );
};

export default UserActions;
