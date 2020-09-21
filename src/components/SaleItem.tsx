import React from "react";
import { IonItem, IonAvatar, IonLabel } from "@ionic/react";
import Moment from "react-moment";
import "moment-timezone";

import useGlobal from "../global/store";

import { ISale } from "../interfaces";

interface IProps {
  sale: ISale;
}

const SaleItem: React.FC<IProps> = ({ sale }) => {
  const state = useGlobal()[0];

  const { productTypes } = state;

  const image = productTypes.filter(item => item.name === sale.product_name)[0].image;

  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={image} alt="Venta" />
      </IonAvatar>
      <IonLabel>
        <h2>{sale.product_title}</h2>
        <h3>
          {sale.units} x {sale.cost}
        </h3>
        <p>
          <Moment fromNow>{sale.date}</Moment>
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default SaleItem;
