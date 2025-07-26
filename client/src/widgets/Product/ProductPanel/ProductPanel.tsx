import { FC } from 'react';

import CreateCartProduct from '@processes/CreateCartProduct';

import { IProductData } from '@shared/models/product';
import ProductRating from './ProductRating/ProductRating';

import styles from './ProductPanel.module.css';

type TProductPanel = Partial<
  Pick<IProductData, 'id' | 'name' | 'price' | 'reviews' | 'stock'>
>;

const ProductPanel: FC<TProductPanel> = (props) => {
  const { id, name, price, reviews, stock } = props;

  const statusColor = {
    backgroundColor: stock && stock > 0 ? '#8cab9b' : '#f97a7a',
  };

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <span className={styles.circle} style={statusColor}></span>
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
