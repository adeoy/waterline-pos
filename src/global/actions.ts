import { Store } from 'use-global-hook';
import { ISale, IState } from '../interfaces';
import { IActions } from '../interfaces/index';
import axios from 'axios';

export const addSale = (
    store: Store<IState, IActions>,
    sale: ISale
  ) => {
    axios.post('http://127.0.0.1:8000/sales', sale)
    .then(resp => {
        const {status} = resp.data;
        if (status === 201) {
            store.setState({
                ...store.state,
                sales: [...store.state.sales, sale],
                toast: {
                    isOpen: true,
                    message: 'Venta registrada',
                    color: 'success',
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        store.setState({
            ...store.state,
            toast: {
                isOpen: true,
                message: 'Error al registrar venta',
                color: 'danger',
            }
        });
    });
  };