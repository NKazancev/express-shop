import useProducts from '@shared/hooks/useProducts';

const HandleProductsPage = () => {
  const products = useProducts();

  console.log(products);

  return <h2>Handle products page</h2>;
};

export default HandleProductsPage;
