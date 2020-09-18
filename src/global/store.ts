import React from "react";
import globalHook from "use-global-hook";

import initialState from "../initialState";
import * as actions from "./actions";

import { IState, IActions } from "../interfaces";

const useGlobal = globalHook<IState, IActions>(React, initialState, actions);

export default useGlobal;
