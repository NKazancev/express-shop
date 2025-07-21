import { IProductReview } from './review';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: FileList | string;
  typeId: string;
  brandId: string;
  stock: number;
}

export type TCreateProductData = Omit<IProduct, 'id' | 'stock'> & {
  images: FileList;
  text: string;
};

export type TUpdateProductData = Pick<
  IProduct,
  'name' | 'description' | 'price' | 'stock'
> & { text: string };

export type TUpdateGalleryData = Pick<IProduct, 'image'> & { images: FileList };

export interface IProductData extends IProduct {
  gallery: IProductGallery;
  info: IProductInfo;
  reviews: IProductReview[];
}

export interface IProductGallery {
  images: string[];
}

export interface IProductInfo {
  text: string;
}

export interface IProductsRequest {
  searchQuery: string;
  productTypeId: string;
  brandFilters: string;
  minPrice: number;
  maxPrice: number;
  skip: number;
  take: number;
}

export interface IProductsResponse {
  data: IProduct[];
  quantity: number;
}
