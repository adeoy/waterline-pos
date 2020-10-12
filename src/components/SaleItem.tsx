import React from "react";
import { IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { cashOutline, trashBinOutline, carOutline } from "ionicons/icons";

import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/es-us";

import { ISale } from "../interfaces";
import { productTypes } from "../data/";
import { formatMoney } from "../utils";

import useGlobal from "../global/store";

interface IProps {
  sale: ISale;
}

const SaleItem: React.FC<IProps> = ({ sale }) => {
  const [state, actions] = useGlobal();
  const { employee } = state;
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
        <h2>{sale.units} x {sale.product_title}</h2>
        <h3>
          {formatMoney(sale.cost)}
          {employee.comision && (
            <span style={{ color: "#2dd36f" }}>
              {" "}
              + <IonIcon icon={cashOutline} color="success"></IonIcon>{" "}
              {formatMoney(sale.product_comision * sale.units)}
            </span>
          )}
          {employee.route.gas_charge > 0 && (
            <span style={{ color: "#eb445a" }}>
              {" "}
              + <IonIcon icon={carOutline} color="danger"></IonIcon>{" "}
              {formatMoney(sale.gas_charge)}
            </span>
          )}
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
