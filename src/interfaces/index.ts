export interface IProductType {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface IVenta {
  product_id: string;
  product_name: string;
  product_price: number;
  units: number;
  pay_recieved: number;
}

export interface IState {
  ventas: IVenta[]
}

export interface IActions {
  addVenta: (venta: IVenta) => void;
}