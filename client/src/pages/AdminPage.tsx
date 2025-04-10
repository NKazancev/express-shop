import CreateProduct from '../processes/CreateProduct';
import CreateProductBrand from '../processes/CreateProductBrand';
import CreateProductType from '../processes/CreateProductType';

function AdminPage() {
  return (
    <div className="admin-page">
      <CreateProduct />
      <CreateProductType />
      <CreateProductBrand />
    </div>
  );
}

export default AdminPage;
