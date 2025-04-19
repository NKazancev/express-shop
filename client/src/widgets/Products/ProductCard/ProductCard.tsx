import { FC } from 'react';

import { IProduct } from '@shared/models/product';
import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useDeleteProductMutation } from '@shared/api/productApi';
import { STATIC_URL } from '@config/consts';

import noPhoto from '@shared/assets/no-photo.jpg';
import styles from './ProductCard.module.css';

const ProductCard: FC<IProduct> = ({ id, name, price, description, image }) => {
  const { role } = useAppSelector((state) => state.user);
  const [deleteProduct] = useDeleteProductMutation();

  const imageUrl = image ? `${STATIC_URL}/${image}` : noPhoto;

  return (
    <li className={styles.product}>
      <div className={styles.image}>
        <img src={imageUrl} alt="image" />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>{price} &#8381;</span>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.button}>
          Add to cart
        </button>

        {role === 'ADMIN' && (
          <button
            type="button"
            className={styles.button}
            onClick={() => deleteProduct(id)}
          >
            Delete product
          </button>
        )}
      </div>
    </li>
  );
};

export default ProductCard;
