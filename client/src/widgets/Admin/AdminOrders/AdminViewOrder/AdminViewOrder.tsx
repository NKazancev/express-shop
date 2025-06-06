import { FC } from 'react';

import { IOrderProduct } from '@shared/models/order';
import { STATIC_URL } from '@config/consts';

import styles from './AdminViewOrder.module.css';

type TAminViewOrder = {
  products: IOrderProduct[];
};

const AdminViewOrder: FC<TAminViewOrder> = ({ products }) => {
  const orderProducts = products?.map(({ id, product, quantity }) => {
    return (
      <li className={styles.product} key={id}>
        <div className={styles.image}>
          <img src={`${STATIC_URL}/${product.image}`} alt="image" />
        </div>

        <p className={styles.info}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.quantity}>Quantity: {quantity}</span>
        </p>
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.list}>{orderProducts}</ul>
    </div>
  );
};

export default AdminViewOrder;
