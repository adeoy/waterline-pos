import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
} from "@ionic/react";

import moment from 'moment';
import "moment-timezone";
import "moment/locale/es-us";

import SaleItemList from "../components/SaleItemList";

import useGlobal from "../global/store";
import NoSales from "../components/helper/NoSales";
import { sortDates } from "../utils/local";

const VentasDia: React.FC = () => {
  const state = useGlobal()[0];

  const { sales, version } = state;

  const date = moment(new Date().toISOString());
  const sortedSales = sales.sort(sortDates);

  const todaySales = sortedSales.filter(
    (item) => moment(item.date).diff(date, 'days') === 0
  );

  const oldSales = sortedSales.filter(
    (item) => moment(item.date).diff(date, 'days') > 0
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ventas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {sales.length > 0 ? (
          <SaleItemList todaySales={todaySales} oldSales={oldSales} />
        ) : (
          <NoSales />
        )}

        <IonLabel>
          <p className="ion-text-center">Versión: {version}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default VentasDia;
