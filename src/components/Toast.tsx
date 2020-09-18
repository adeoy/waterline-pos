import React from "react";
import { IonToast } from "@ionic/react";
import { IToast } from "../interfaces/index";

const Toast: React.FC<IToast> = (props) => <IonToast {...props}></IonToast>;

export default Toast;
