import { IState } from "./interfaces";

const initialState: IState = {
  employee: {
    name: "",
    type: "local",
    comision: false,
    route: { name: "Local", gas_charge: 0.0 },
  },
  sales: [],
  deletedSales: [],
  toast: {
    isOpen: false,
    message: "",
    color: "dark",
  },
  alert: {
    isOpen: false,
    message: "",
    onConfirm: () => {},
  },
  salesInfo: {
    weekComision: 0.0,
  },
  version: "1.1.0",
  apiUrl: "https://consultaunica.mx/wl/",
  currentOffer: null,
  currentBusinessPrice: null,
};

export default initialState;
