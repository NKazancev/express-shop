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

export type TCreateProductData = Omit<IProduct, 'id'> & {
  images: FileList;
  text: string;
};

export type TUpdateProductData = Partial<
  Pick<TCreateProductData, 'name' | 'description' | 'price' | 'text' | 'stock'>
>;

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
  productType: string;
  brandFilters: string;
  minPrice: number;
  maxPrice: number;
}
