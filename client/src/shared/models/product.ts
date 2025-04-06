export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | FileList;
}

export interface IProductsRequest {
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
}
