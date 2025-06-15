import { useGetAllUserOrdersQuery } from '@shared/api/orderApi';

import UserOrdersList from '@widgets/User/UserOrders/UserOrdersList/UserOrdersList';

import styles from './UserOrdersPage.module.css';

const UserOrdersPage = () => {
  const { data: orders } = useGetAllUserOrdersQuery();

  return (
    <div>
      <h2 className={styles.title}>Orders</h2>
      <UserOrdersList orders={orders} />
    </div>
  );
};

export default UserOrdersPage;
