import React from "react";
import globalHook, {Store} from "use-global-hook";

import initialState from "../initialState";
import * as actions from "./actions";

import { IState, IActions } from "../interfaces";

const initializer = (store: Store<IState, IActions>) => {
    store.actions.getDataFromLocalStorage();
  };

const useGlobal = globalHook<IState, IActions>(React, initialState, actions, initializer);

export default useGlobal;
