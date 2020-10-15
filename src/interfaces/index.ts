export interface IProductType {
  name: string;
  title: string;
  image: string;
  price: number;
  comision: number;
}

export interface IGeo {
  lat: number;
  long: number;
}

export interface IEmployeeRoute {
  name: string;
  gas_charge: number;
}

export interface IPriceRule {
  name: string;
  price: number;
  valid: (units: number) => boolean;
}

export interface ISale {
  product_name: string;
  product_title: string;
  product_price: number;
  product_comision: number;
  units: number;
  pay_received: number;
  cost: number;
  date: string;
  geo: IGeo;
  route: IEmployeeRoute;
  rule: IPriceRule | null;
}

export interface IToast {
  isOpen: boolean;
  message: string;
  color: string;
}

export interface IAlert {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export interface IEmployeeType {
  type: string;
  comision: boolean;
  route: IEmployeeRoute;
}

export interface IEmployee extends IEmployeeType {
  name: string;
}

export interface ISalesInfo {
  weekComision: number;
}

export interface IState {
  employee: IEmployee;
  sales: ISale[];
  deletedSales: ISale[];
  toast: IToast;
  alert: IAlert;
  version: string;
  apiUrl: string;
  salesInfo: ISalesInfo;
}

export interface IActions {
  addSale: (sale: ISale) => void;
  changeToast: (toast: IToast) => void;
  openToast: (isOpen: boolean) => void;
  changeAlert: (alert: IAlert) => void;
  openAlert: (isOpen: boolean) => void;
  getDataFromLocalStorage: () => void;
  removeSale: (date: string) => void;
  reportData: () => void;
  setEmployee: (employee: IEmployee) => void;
}