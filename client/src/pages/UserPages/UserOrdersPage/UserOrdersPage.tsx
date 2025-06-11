import { useGetAllUserOrdersQuery } from '@shared/api/orderApi';

import styles from './UserOrdersPage.module.css';

const UserOrdersPage = () => {
  const { data: orders } = useGetAllUserOrdersQuery();

  console.log(orders);

  return <h2 className={styles.title}>User orders page</h2>;
};

export default UserOrdersPage;
