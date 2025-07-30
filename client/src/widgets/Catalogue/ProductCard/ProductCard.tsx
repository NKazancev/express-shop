import { FC } from 'react';
import { useNavigate } from 'react-router';

import { IProduct } from '@shared/models/product';
import { STATIC_URL } from '@config/consts';

import styles from './ProductCard.module.css';

const ProductCard: FC<IProduct> = (props) => {
  const { id, name, price, description, image } = props;

  const navigate = useNavigate();
  const imageUrl = `${STATIC_URL}/${image}`;
  const showProductPage = () => navigate(`/products/${id}`);

  return (
    <li onClick={showProductPage} className={styles.product}>
      <div className={styles.image}>
        <img src={imageUrl} alt="image" />
      </div>

      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.description}>{description}</p>
        <span className={styles.price}>{price} &#8381;</span>
      </div>
    </li>
  );
};

export default ProductCard;
