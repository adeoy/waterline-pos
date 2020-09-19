import React from "react";
import { IonItem, IonAvatar, IonLabel } from "@ionic/react";
import Moment from "react-moment";
import "moment-timezone";

import { ISale } from "../interfaces";

interface IProps {
  sale: ISale;
}

const SaleItem: React.FC<IProps> = ({ sale }) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src="https://i.postimg.cc/k5s6fMhX/litro.jpg" alt="Venta" />
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
