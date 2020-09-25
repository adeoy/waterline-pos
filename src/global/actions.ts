import { Store } from "use-global-hook";

import { IEmployee, ISale, IState, IToast } from "../interfaces";
import { IActions } from "../interfaces";
import { setItem, getItem, delItem } from "../utils";
import { IAlert } from "../interfaces/index";
import Axios from "axios";

export const addSale = (store: Store<IState, IActions>, sale: ISale) => {
  const sales = [...store.state.sales, sale];
  setItem("sales", sales);
  store.setState({
    ...store.state,
    sales,
    toast: {
      isOpen: true,
      message: "Venta registrada",
      color: "primary",
    },
  });
};

export const getDataFromLocalStorage = async (
  store: Store<IState, IActions>
) => {
  const sales = await getItem("sales", []);
  const deletedSales = await getItem("deletedSales", []);
  const employee = await getItem("employee", {name: "", type: "local"});
  store.setState({
    ...store.state,
    sales,
    deletedSales,
    employee,
  });
};

export const removeSale = (store: Store<IState, IActions>, date: string) => {
  const deletedSale: ISale = store.state.sales.find(
    (item) => item.date === date
  )!;

  const sales: ISale[] = store.state.sales.filter((item) => item.date !== date);
  const deletedSales: ISale[] = [...store.state.deletedSales, deletedSale];

  setItem("sales", sales);
  setItem("deletedSales", deletedSales);

  store.setState({
    ...store.state,
    sales,
    deletedSales,
    toast: {
      isOpen: true,
      message: "Venta eliminada",
      color: "primary",
    },
  });
};

export const changeToast = (store: Store<IState, IActions>, toast: IToast) => {
  store.setState({
    ...store.state,
    toast,
  });
};

export const openToast = (store: Store<IState, IActions>, isOpen: boolean) => {
  store.setState({
    ...store.state,
    toast: {
      ...store.state.toast,
      isOpen,
    },
  });
};
export const changeAlert = (store: Store<IState, IActions>, alert: IAlert) => {
  store.setState({
    ...store.state,
    alert,
  });
};

export const openAlert = (store: Store<IState, IActions>, isOpen: boolean) => {
  store.setState({
    ...store.state,
    alert: {
      ...store.state.alert,
      isOpen,
    },
  });
};

export const reportData = (store: Store<IState, IActions>) => {
  const { sales, deletedSales } = store.state;
  Axios.post("http://127.0.0.1:5000/report/sales/", {
    sales,
    deletedSales,
  })
    .then((resp) => {
      const { status, data } = resp;
      if (status === 201) {
        delItem("sales");
        delItem("deletedSales");
        store.setState({
          ...store.state,
          sales: [],
          deletedSales: [],
          toast: {
            isOpen: true,
            message: "¡Carga completa!",
            color: "primary",
          },
        });
      } else {
        store.setState({
          ...store.state,
          toast: {
            isOpen: true,
            message: "Error al cargar: " + data.message,
            color: "danger",
          },
        });
      }
      console.log(data);
    })
    .catch((err) => {
      store.setState({
        ...store.state,
        toast: {
          isOpen: true,
          message: "Error al cargar",
          color: "danger",
        },
      });
    });
};

export const setEmployee = (
  store: Store<IState, IActions>,
  employee: IEmployee
) => {
  setItem("employee", employee);
  store.setState({
    ...store.state,
    employee,
  });
};
