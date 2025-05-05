export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: FileList | string;
  typeId: string;
  brandId: string;
}

export interface ICreateProductData extends IProduct {
  images: FileList;
  text: string;
}

export interface IProductData extends IProduct {
  gallery: IProductGallery;
  info: IProductInfo;
  reviews: IProductReview[] | undefined;
}

export interface IProductGallery {
  images: string[] | undefined;
}

export interface IProductInfo {
  text: string | undefined;
}

export interface IProductReview {
  id: string;
  title: string;
  text: string;
  rate: string;
  productId: string;
  userId: string;
}

export interface IProductsRequest {
  searchQuery: string;
  productType: string;
  brandFilters: string;
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
