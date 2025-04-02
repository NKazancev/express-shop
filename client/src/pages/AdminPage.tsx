import { useCreateProductMutation } from '../shared/api/productApi';
import { IProduct } from '../shared/models/product';
import AddProductForm from '../widgets/Admin/AddProductForm';

function AdminPage() {
  const [createProduct] = useCreateProductMutation();

  const handleProductAddition = async (data: Omit<IProduct, 'id'>) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      formData.append('data', JSON.stringify(data));
      await createProduct(formData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return <AddProductForm onProductAddition={handleProductAddition} />;
}

export default AdminPage;
