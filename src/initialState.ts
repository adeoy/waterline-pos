import { IState } from "./interfaces";

const initialState: IState = {
  employee: {
    name: "",
    type: "local",
    comision: false,
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
  version: "1.0.0",
};

export default initialState;
