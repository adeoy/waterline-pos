import { Store } from "use-global-hook";

import { IEmployee, ISale, IState, IToast } from "../interfaces";
import { IActions } from "../interfaces";
import { setItem, getItem, delItem } from "../utils";
import { IAlert } from "../interfaces/index";
import Axios from "axios";
import { getSalesComision } from "../utils/local";

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
  const employee = await getItem("employee", {
    name: "John Deere",
    type: "local",
    route: { name: "Local", gas_charge: 0.0 },
  });
  const salesInfo = await getItem("salesInfo", {
    weekComision: 0.0,
  });
  store.setState({
    ...store.state,
    sales,
    deletedSales,
    employee,
    salesInfo,
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
  const {
    apiUrl,
    employee,
    sales,
    deletedSales,
    salesInfo: { weekComision },
  } = store.state;

  /*const todayComision = getSalesComision(sales);
  const salesInfo = {
    weekComision: weekComision + todayComision,
  };

  setItem("salesInfo", salesInfo);
  delItem("sales");
  delItem("deletedSales");

  store.setState({
    ...store.state,
    sales: [],
    deletedSales: [],
    salesInfo,
    toast: {
      isOpen: true,
      message: "¡Carga completa!",
      color: "primary",
    },
  });*/

  Axios.post(apiUrl + "report/sales/", {
    employee,
    sales,
    deletedSales,
  })
    .then((resp) => {
      const { status, data } = resp;
      if (status === 201) {
        const todayComision = getSalesComision(sales);
        const salesInfo = {
          weekComision: weekComision + todayComision,
        };

        delItem("sales");
        delItem("deletedSales");
        setItem("salesInfo", salesInfo);

        store.setState({
          ...store.state,
          sales: [],
          deletedSales: [],
          salesInfo,
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
    })
    .catch((err) => {
      console.log(err);
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

export const restartComision = (store: Store<IState, IActions>) => {
  const salesInfo = {
    weekComision: 0.0,
  };

  setItem("salesInfo", salesInfo);
  store.setState({
    ...store.state,
    salesInfo,
  });
};
