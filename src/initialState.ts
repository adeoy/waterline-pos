import { IState } from "./interfaces";

const initialState: IState = {
    sales: [],
    toast: {
        isOpen: false,
        message: '',
        color: 'dark',
    },
    productTypes: []
}

export default initialState;