import { FC } from 'react';

import { IOrderProduct } from '@shared/models/order';
import { STATIC_URL } from '@config/consts';

import styles from './UserOrderProducts.module.css';

type TUserOrderProducts = {
  products: IOrderProduct[];
};

const UserOrderProducts: FC<TUserOrderProducts> = ({ products }) => {
  const orderProducts = products.map(({ id, image, name, quantity }) => {
    return (
      <li className={styles.product} key={id}>
        <div>
          <img src={`${STATIC_URL}/${image}`} alt="image" />
        </div>

        <p className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.quantity}>Quantity: {quantity}</span>
        </p>
      </li>
    );
  });

  return <ul className={styles.list}>{orderProducts}</ul>;
};

export default UserOrderProducts;
