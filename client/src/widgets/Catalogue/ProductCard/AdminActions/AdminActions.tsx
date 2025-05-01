import { useDeleteProductMutation } from '@shared/api/productApi';

const AdminActions = ({ id }: { id: string }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleProductDeletion = async () => {
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleProductDeletion}>
        Delete product
      </button>
    </>
  );
};

export default AdminActions;
