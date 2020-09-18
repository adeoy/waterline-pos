export interface IProductType {
  name: string;
  title: string;
  image: string;
  price: number;
}

export interface ISale {
  product_name: string;
  product_title: string;
  product_price: number;
  units: number;
  pay_received: number;
  cost: number;
}

export interface IToast {
  isOpen: boolean;
  message: string;
  color: string;
}

export interface IState {
  sales: ISale[];
  toast: IToast;
  productTypes: IProductType[];
}

export interface IActions {
  addSale: (sale: ISale) => void;
  changeToast: (toast: IToast) => void;
  openToast: (isOpen: boolean) => void;
  getProductTypes: (url: string) => void;
}