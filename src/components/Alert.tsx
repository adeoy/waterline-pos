import React from "react";
import { IonAlert } from "@ionic/react";
import { IAlert } from "../interfaces";


interface IProps extends IAlert {
  onDidDismiss(): any;
}

const Alert: React.FC<IProps> = ({ isOpen, message, onDidDismiss, onConfirm }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      header={"Atención"}
      message={message}
      buttons={[
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Si",
          handler: onConfirm,
        },
      ]}
    />
  );
};

export default Alert;
