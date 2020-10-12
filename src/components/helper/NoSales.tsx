import React from "react";
import { IonLabel } from "@ionic/react";

interface IProps {
  message?: string;
}

const NoSales: React.FC<IProps> = ({ message }) => (
  <IonLabel>
    <p style={{ marginTop: "2rem" }} className="ion-text-center">
      {message || "No hay ventas registradas"}
    </p>
  </IonLabel>
);

export default NoSales;
