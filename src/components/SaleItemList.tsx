import React from "react";
import { IonItemDivider, IonLabel, IonList } from "@ionic/react";
import { ISale } from "../interfaces";
import SaleItem from "./SaleItem";
import Reporter from "./Reporter";

interface IProps {
  todaySales: ISale[];
  oldSales: ISale[];
}

const SaleItemList: React.FC<IProps> = ({ todaySales, oldSales }) => (
  <IonList>
    <Reporter />

    <IonItemDivider>
      <IonLabel>Ventas de Hoy</IonLabel>
    </IonItemDivider>
    {todaySales.map((sale) => (
      <SaleItem key={sale.date} sale={sale} />
    ))}
    <IonItemDivider>
      <IonLabel>Ventas Antiguas</IonLabel>
    </IonItemDivider>
    {oldSales.map((sale) => (
      <SaleItem key={sale.date} sale={sale} />
    ))}
  </IonList>
);

export default SaleItemList;
