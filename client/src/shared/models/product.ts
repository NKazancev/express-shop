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

export type TCreateProductData = Pick<
  IProduct,
  'name' | 'description' | 'price' | 'brandId' | 'typeId' | 'image'
> & {
  images: FileList;
  text: string;
};

export type TUpdateProductData = Partial<
  Pick<IProduct, 'name' | 'description' | 'price' | 'stock'> & { text: string }
>;

export type TUpdateGalleryData = Pick<IProduct, 'image'> & { images: FileList };

export type TProductData = Pick<IProduct, 'id' | 'name' | 'price' | 'stock'> & {
  gallery: IProductGallery;
  info: IProductInfo;
  reviews: IProductReview[];
};

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
  data: Pick<
    IProduct,
    'id' | 'name' | 'price' | 'description' | 'image' | 'stock'
  >[];
  quantity: number;
}
