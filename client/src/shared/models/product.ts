export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | FileList;
  typeId?: string;
}

export interface IProductsRequest {
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
}

export interface IProductType {
  id: string;
  name: string;
}
