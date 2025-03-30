import { useCreateProductMutation } from '../shared/api/productApi';
import { IProduct } from '../shared/models/product';
import AddProductForm from '../widgets/Admin/AddProductForm';

function AdminPage() {
  const [createProduct] = useCreateProductMutation();

  const handleProductAddition = async (data: Omit<IProduct, 'id'>) => {
    try {
      const body = { ...data, price: Number(data.price) };
      await createProduct({ ...body }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return <AddProductForm onProductAddition={handleProductAddition} />;
}

export default AdminPage;
