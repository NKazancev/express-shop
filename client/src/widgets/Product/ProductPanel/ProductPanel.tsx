import { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import { IProduct } from '@shared/models/product';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useCreateCartProductMutation } from '@shared/api/cartApi';
import ModalLogin from '@modals/ModalLogin';

import styles from './ProductPanel.module.css';

const ProductPanel: FC<Partial<IProduct>> = ({ id, name, price }) => {
  const { isLogged } = useAppSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [createCartProduct] = useCreateCartProductMutation();

  const addProductToCart = async () => {
    if (!isLogged) {
      setModalVisible(true);
      return;
    }
    try {
      await createCartProduct({ productId: id, quantity: 1 }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const hideModal = () => setModalVisible(false);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.circle}></div>
        <div>In stock</div>
      </div>

      <h5 className={styles.title}>{name}</h5>

      <div className={styles.rating}>
        <span>Rating:</span>
        <div className={styles.stars}>
          <Rating
            iconsCount={10}
            allowFraction={true}
            initialValue={10}
            SVGstyle={{ width: '24px', height: '24px' }}
            fillColor="#ffd76d"
            style={{
              height: '24px',
              pointerEvents: 'none',
            }}
          />
          <span className={styles.votes}>(total votes: 2)</span>
        </div>
      </div>

      <span className={styles.price}>Price: {price} &#8381;</span>

      <button
        type="button"
        onClick={addProductToCart}
        className={styles.button}
      >
        Add to cart
      </button>

      {modalVisible && <ModalLogin onClose={hideModal} />}
    </div>
  );
};

export default ProductPanel;
