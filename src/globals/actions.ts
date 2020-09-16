import { IVenta, IState, IActions } from "../interfaces";
import { Store } from "use-global-hook";

export const addVenta = (
  store: Store<IState, IActions>,
  venta: IVenta
) => {
  store.setState({
      ...store.state,
      ventas: [...store.state.ventas, venta]
    });
};
