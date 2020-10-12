import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
} from "@ionic/react";

import SaleItemList from "../components/SaleItemList";

import useGlobal from "../global/store";
import { ISale } from "../interfaces";
import { formatMoney } from "../utils/index";
import NoSales from '../components/helper/NoSales';

const VentasDia: React.FC = () => {
  const state = useGlobal()[0];

  const { sales, version, employee } = state;

  const sortDates = (a: ISale, b: ISale): number => {
    let comparison = 0;
    if (a.date > b.date) {
      comparison = 1;
    } else if (a.date < b.date) {
      comparison = -1;
    }
    return comparison * -1;
  };

  const getComision = (): number => {
    let comision: number = 0.0;
    sales.forEach((item) => {
      comision += item.product_comision * item.units;
    });
    return comision;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ventas del día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {employee.comision && (
          <>
            <h5 style={{ marginLeft: "1rem" }}>Mis ganancias:</h5>
            <p className="label-number">{formatMoney(getComision())}</p>
            <h5 style={{ marginLeft: "1rem" }}>Ventas</h5>
          </>
        )}

        {sales.length > 0 ? (
          <SaleItemList sales={sales.sort(sortDates)} />
        ) : <NoSales />}

        <IonLabel>
          <p className="ion-text-center">Versión: {version}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default VentasDia;
