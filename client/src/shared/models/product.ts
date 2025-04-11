export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | FileList;
  typeId?: string;
  brandId?: string;
}

export interface IProductsRequest {
  searchQuery: string;
  productType: string;
  minPrice: number;
  maxPrice: number;
}

export interface IProductType {
  id: string;
  name: string;
}

export interface IProductBrand {
  id: string;
  name: string;
}

export interface IBrandCheckbox extends IProductBrand {
  checked: boolean;
}
