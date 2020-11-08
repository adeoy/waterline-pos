import React from "react";
import { IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from "@ionic/react";
import {
  cashOutline,
  trashBinOutline,
  carOutline,
  waterOutline,
  peopleOutline,
} from "ionicons/icons";

import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/es-us";

import { ISale } from "../interfaces";
import { productTypes } from "../data/";
import { formatMoney } from "../utils";

import useGlobal from "../global/store";
import {
  calculateBusinessDiscount,
  calculateComisionCost,
  getGasChargeByUnits,
} from "../utils/local";

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

  const gasCharge = getGasChargeByUnits(sale);
  const comisionNCost = calculateComisionCost(employee.comision, sale);
  const businessDiscount = calculateBusinessDiscount(
    sale.businessDiscount,
    sale
  );
  const ganancia = comisionNCost - sale.cost;
  // let ganancia = (employee.comision ? sale.product_comision : 0.0) * sale.units;
  // if (employee.comision && sale.offerDiscount > 0) {
  //   ganancia -=
  //     (sale.offerDiscount / sale.product_price) * sale.product_comision;
  // }

  console.log({cost: sale.cost,
    ganancia,
    gasCharge,
    offerDiscount: sale.offerDiscount,
    businessDiscount});
  

  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={image} alt="Venta" />
      </IonAvatar>
      <IonLabel>
        <h2>
          {sale.units} x {sale.product_title} ={" "}
          <span style={{ color: "#3880ff" }}>
            {formatMoney(
              sale.cost +
                ganancia +
                gasCharge -
                sale.offerDiscount -
                businessDiscount
            )}
          </span>
        </h2>
        <h3>
          <span style={{ color: "#3dc2ff" }}>
            <IonIcon icon={waterOutline} color="secondary"></IonIcon>
            {formatMoney(sale.cost)}
          </span>
          {employee.comision && (
            <span style={{ color: "#2dd36f" }}>
              {" "}
              + <IonIcon icon={cashOutline} color="success"></IonIcon>{" "}
              {formatMoney(ganancia)}
            </span>
          )}
          {gasCharge > 0 && (
            <span style={{ color: "#ffc409" }}>
              {" "}
              + <IonIcon icon={carOutline} color="warning"></IonIcon>{" "}
              {formatMoney(gasCharge)}
            </span>
          )}
          {sale.offerDiscount > 0 && (
            <span style={{ color: "#eb445a" }}>
              {" "}
              - <IonIcon icon={cashOutline} color="danger"></IonIcon>{" "}
              {formatMoney(sale.offerDiscount)}
            </span>
          )}
          {sale.businessDiscount > 0 && (
            <span style={{ color: "#eb445a" }}>
              {" "}
              - <IonIcon icon={peopleOutline} color="danger"></IonIcon>{" "}
              {formatMoney(businessDiscount)}
            </span>
          )}
        </h3>
        <p>
          <Moment fromNow locale="es-us">
            {sale.date}
          </Moment>{" "}
          ({sale.route.name})
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
