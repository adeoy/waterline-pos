import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./VentasDia.css";
import SaleItemList from '../components/SaleItemList';

import useGlobal from "../global/store";

const VentasDia: React.FC = () => {
  const state = useGlobal()[0];

  const { sales } = state;

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ventas del día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SaleItemList sales={sales} />
      </IonContent>
    </IonPage>
  );
};

export default VentasDia;
