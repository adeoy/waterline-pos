import React from "react";
import globalHook from 'use-global-hook';

import * as actions from "./actions";
import { IState, IActions } from '../interfaces/index';

const initialState: IState = {
    ventas: [],
};

const useGlobal = globalHook<IState, IActions>(React, initialState, actions);

export default useGlobal;