import React from "react";
import { IonList } from "@ionic/react";
import { ISale } from "../interfaces";
import SaleItem from "./SaleItem";

interface IProps {
  sales: ISale[];
}

const SaleItemList: React.FC<IProps> = ({ sales }) => (
  <IonList>
    {sales.map((sale) => (
      <SaleItem key={sale.date} sale={sale} />
    ))}
  </IonList>
);

export default SaleItemList;
