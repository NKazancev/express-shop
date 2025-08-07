import { useParams } from 'react-router';

import { USER_ORDERS_PER_PAGE } from '@config/consts';
import { useGetAllUserOrdersQuery } from '@shared/api/orderApi';

import UserOrdersList from '@widgets/User/UserOrders/UserOrdersList/UserOrdersList';
import Pagination from '@widgets/Pagination/Pagination';

import styles from './UserOrdersPage.module.css';

const UserOrdersPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const skip = USER_ORDERS_PER_PAGE * (currentPage - 1);

  const { data: orders, isSuccess } = useGetAllUserOrdersQuery({
    skip,
    take: USER_ORDERS_PER_PAGE,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>

      {!!orders?.quantity && isSuccess && (
        <>
          <UserOrdersList orders={orders.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/user/orders"
            itemsPerPage={USER_ORDERS_PER_PAGE}
            productsQuantity={orders.quantity}
          />
        </>
      )}

      {!orders?.quantity && isSuccess && (
        <p className={styles.notification}>You don't have any orders</p>
      )}
    </div>
  );
};

export default UserOrdersPage;
