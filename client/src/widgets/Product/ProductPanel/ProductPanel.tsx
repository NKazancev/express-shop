import { FC } from 'react';

import CreateCartProduct from '@processes/User/CreateCartProduct';

import { IProduct } from '@shared/models/product';
import { IProductReview } from '@shared/models/review';

import ProductRating from './ProductRating/ProductRating';

import styles from './ProductPanel.module.css';

export type TProductPanel = Pick<
  IProduct,
  'id' | 'name' | 'price' | 'stock'
> & {
  reviews: IProductReview[];
};

const ProductPanel: FC<TProductPanel> = (props) => {
  const { id, name, price, stock, reviews } = props;

  const statusColor = {
    backgroundColor: stock && stock > 0 ? '#8cab9b' : '#f97a7a',
  };

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <span className={styles.circle} style={statusColor} />
        <span>{stock && stock > 0 ? 'In stock' : 'Out of stock'}</span>
      </div>

      <h4 className={styles.title}>{name}</h4>

      <div className={styles.rating}>
        <ProductRating reviews={reviews} />
      </div>

      <span className={styles.price}>Price: {price} &#8381;</span>

      <CreateCartProduct productId={id} buttonStyle={styles.button} />
    </div>
  );
};

export default ProductPanel;
