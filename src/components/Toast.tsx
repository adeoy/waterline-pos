import React from "react";
import { IonToast } from "@ionic/react";
import { IToast } from "../interfaces/index";

interface IProps extends IToast {
    onDidDismiss(): any;
}

const Toast: React.FC<IProps> = (props) => <IonToast {...props} duration={3000}></IonToast>;

export default Toast;
