import { FC } from 'react';

import { IProduct } from '../../../shared/models/product';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { useDeleteProductMutation } from '../../../shared/api/productApi';
import { STATIC_URL } from '../../../config/consts';

import noPhoto from '../../../shared/assets/no-photo.jpg';
import styles from './ProductCard.module.css';

const ProductCard: FC<IProduct> = ({ id, name, price, description, image }) => {
  const { role } = useAppSelector((state) => state.user);
  const [deleteProduct] = useDeleteProductMutation();

  const imageUrl = image ? `${STATIC_URL}/${image}` : noPhoto;

  return (
    <li className={styles.product}>
      <div>
        <img src={imageUrl} alt="image" height={180} />
      </div>

      <h3>{name}</h3>
      <span>{price} &#8381;</span>
      <p className={styles.description}>{description}</p>

      <div className={styles.buttons}>
        <button type="button" className={styles.button}>
          Show details
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

        {role === 'USER' && (
          <button type="button" className={styles.button}>
            Add to cart
          </button>
        )}
      </div>
    </li>
  );
};

export default ProductCard;
