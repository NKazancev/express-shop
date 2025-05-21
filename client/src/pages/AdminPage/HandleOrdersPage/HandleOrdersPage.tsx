import { useGetAllOrdersQuery } from '@shared/api/orderApi';

const HandleOrdersPage = () => {
  const { data: orders } = useGetAllOrdersQuery();

  console.log(orders);

  return <h2>Handle orders page</h2>;
};

export default HandleOrdersPage;
