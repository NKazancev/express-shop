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
