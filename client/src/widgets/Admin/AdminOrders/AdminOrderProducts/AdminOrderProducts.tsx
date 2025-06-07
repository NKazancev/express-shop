import { FC } from 'react';

import { IOrderProduct } from '@shared/models/order';
import { STATIC_URL } from '@config/consts';

import styles from './AdminOrderProducts.module.css';

type TAdminOrderProducts = {
  products: IOrderProduct[];
};

const AdminOrderProducts: FC<TAdminOrderProducts> = ({ products }) => {
  const orderProducts = products?.map(({ id, name, quantity, image }) => {
    return (
      <li className={styles.product} key={id}>
        <div className={styles.image}>
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

export default AdminOrderProducts;
