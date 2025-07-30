import { useGetAllOrdersQuery } from '@shared/api/orderApi';

import AdminOrdersList from '@widgets/Admin/AdminOrders/AdminOrdersList/AdminOrdersList';

import styles from './HandleOrdersPage.module.css';

const HandleOrdersPage = () => {
  const { data: orders } = useGetAllOrdersQuery();

  return (
    <div>
      <h2 className={styles.title}>Orders</h2>
      {orders && <AdminOrdersList orders={orders} />}
    </div>
  );
};

export default HandleOrdersPage;
