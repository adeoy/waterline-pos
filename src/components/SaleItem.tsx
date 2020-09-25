import React from "react";
import { IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";

import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/es-us";

import { ISale } from "../interfaces";
import {productTypes} from "../data/";
import { formatMoney } from "../utils";

import useGlobal from "../global/store";

interface IProps {
  sale: ISale;
}

const SaleItem: React.FC<IProps> = ({ sale }) => {
  const [state, actions] = useGlobal();
  const {employee} = state;
  const { changeAlert, removeSale } = actions;

  const image = productTypes.filter(
    (item) => item.name === sale.product_name
  )[0].image;

  const handleDelete = () => {
    changeAlert({
      isOpen: true,
      message: "¿Esta seguro de eliminar la venta?",
      onConfirm: () => {
        removeSale(sale.date);
      },
    });
  };

  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={image} alt="Venta" />
      </IonAvatar>
      <IonLabel>
        <h2>{sale.product_title}</h2>
        <h3>
          {sale.units} x {formatMoney(sale.cost)} + {employee.comision && (<span>Comisión: {formatMoney(sale.product_comision * sale.units)}</span>)}
        </h3>
        <p>
          <Moment fromNow locale="es-us">
            {sale.date}
          </Moment>
        </p>
      </IonLabel>
      <IonButton
        fill="clear"
        size="large"
        slot="end"
        color="danger"
        onClick={() => handleDelete()}
      >
        <IonIcon icon={trashBinOutline} color="danger" />
      </IonButton>
    </IonItem>
  );
};

export default SaleItem;
