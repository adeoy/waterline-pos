import React from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import moment from 'moment';
import "moment-timezone";
import "moment/locale/es-us";

import useGlobal from "../global/store";
import { formatMoney } from "../utils";
import { calculateComisionCost, getGasChargeByUnits, getSalesComision, sortDates } from "../utils/local";
import RestartComision from "../components/RestartComision";

const Stats: React.FC = () => {
  const state = useGlobal()[0];

  const { sales, employee, salesInfo } = state;

  const date = moment(new Date().toISOString());
  const sortedSales = sales.sort(sortDates);

  const todaySales = sortedSales.filter(
    (item) => moment(item.date).diff(date, 'days') === 0
  );

  const todayComision = getSalesComision(todaySales);

  const todaySale = todaySales.reduce(
    (acc, item) =>
      acc +
      (calculateComisionCost(employee.comision, item) + getGasChargeByUnits(item)),
    0
  );

  const todaySaleNoComision = todaySales.reduce(
    (acc, item) =>
      acc +
      (calculateComisionCost(false, item) + getGasChargeByUnits(item)),
    0
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dineros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {employee.comision && (
          <>
            <h5 style={{ marginLeft: "1rem" }}>Mis Ganancias</h5>

            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <h5 style={{ marginLeft: "1rem", textAlign: "center" }}>
                    De hoy
                  </h5>
                </IonCol>
                <IonCol size="6">
                  <h5 style={{ marginLeft: "1rem", textAlign: "center" }}>
                    Mi pago semanal
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center">
                <IonCol size="6">
                  <p className="label-number">{formatMoney(todayComision)}</p>
                </IonCol>
                <IonCol size="6">
                  <p className="label-number" style={{ color: "#2dd36f" }}>
                    {formatMoney(todayComision + salesInfo.weekComision)}
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}

        <h5 style={{ marginLeft: "1rem" }}>Ventas</h5>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <h5 style={{ marginLeft: "1rem", textAlign: "center" }}>
                Sin comisión
              </h5>
            </IonCol>
            <IonCol size="6">
              <h5 style={{ marginLeft: "1rem", textAlign: "center" }}>
              {employee.comision ? "Entregar hoy" : "Ventas del día"}
              </h5>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="6">
              <p className="label-number">{formatMoney(todaySaleNoComision)}</p>
            </IonCol>
            <IonCol size="6">
              <p className="label-number" style={{ color: "#3880ff" }}>
                {formatMoney(todaySale)}
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          <RestartComision />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Stats;
