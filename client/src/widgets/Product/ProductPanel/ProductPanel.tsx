import { FC, useState } from 'react';

import { IProductData } from '@shared/models/product';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useCreateCartProductMutation } from '@shared/api/cartApi';
import ProductRating from './ProductRating/ProductRating';
import ModalLogin from '@modals/ModalLogin/ModalLogin';

import styles from './ProductPanel.module.css';

type TProductPanel = Partial<
  Pick<IProductData, 'id' | 'name' | 'price' | 'reviews' | 'stock'>
>;

const ProductPanel: FC<TProductPanel> = (props) => {
  const { id, name, price, reviews, stock } = props;

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
        <span
          className={styles.circle}
          style={{
            backgroundColor: stock && stock > 0 ? '#8cab9b' : '#f97a7a',
          }}
        ></span>
        <span>{stock && stock > 0 ? 'In stock' : 'Out of stock'}</span>
      </div>

      <h4 className={styles.title}>{name}</h4>

      <div className={styles.rating}>
        <ProductRating reviews={reviews} />
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
