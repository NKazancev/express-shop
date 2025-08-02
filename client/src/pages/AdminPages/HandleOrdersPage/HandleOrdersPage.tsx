import { useParams } from 'react-router';

import { useGetAllOrdersQuery } from '@shared/api/orderApi';

import Pagination from '@widgets/Pagination/Pagination';
import AdminOrdersList from '@widgets/Admin/AdminOrders/AdminOrdersList/AdminOrdersList';

import styles from './HandleOrdersPage.module.css';

const HandleOrdersPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const itemsPerPage = 3;
  const skip = itemsPerPage * (currentPage - 1);

  const { data: orders, isSuccess } = useGetAllOrdersQuery({
    skip,
    take: itemsPerPage,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>

      {!!orders?.quantity && isSuccess && (
        <>
          <AdminOrdersList orders={orders.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/admin/orders"
            productsQuantity={orders.quantity}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}

      {!orders?.quantity && isSuccess && (
        <p className={styles.notification}>Nobody has placed any order yet</p>
      )}
    </div>
  );
};

export default HandleOrdersPage;
