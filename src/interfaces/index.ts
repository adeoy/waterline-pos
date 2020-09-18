export interface IProductType {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface ISale {
  product_id: string;
  product_name: string;
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
}

export interface IActions {
  addSale: (sale: ISale) => void;
  changeToast: (toast: IToast) => void;
  openToast: (isOpen: boolean) => void;
}